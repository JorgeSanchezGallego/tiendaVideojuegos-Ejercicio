const dayjs = require('dayjs')
const CONFIG = require('../config/config.price')

function validarStock(items) {
    return items.every(item => item.stockDisponible >= item.cantidad)
}

function calcularSubtotal(items) {
    return items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
}

function calcularEnvio(subtotal) {
    return subtotal >= CONFIG.envioGratisUmbral ? 0 : CONFIG.costeEnvio
}

function generarFactura(cliente, items){
    if (!validarStock(items)){
        throw new Error("Falta de stock en algunos productos")
    }

    const subtotal = calcularSubtotal(items)
    const esFragil = items.some(item => item.esFragil)

    let descuento = subtotal > CONFIG.descuentoUmbral ? (subtotal * CONFIG.descuentoPorcentaje): 0
    const subtotalConDescuento = subtotal - descuento

    const impuestos = subtotalConDescuento * CONFIG.iva
    const gastosEnvio = calcularEnvio(subtotalConDescuento)
    const total = subtotalConDescuento + impuestos + gastosEnvio

    const fechaEntrega = dayjs().add(4, 'day').format('DD/MM/YYYY')
    const nombresProductos = items.map(p => `${p.nombre} x ${p.cantidad}`).join("\n - ")

    return `█████████████████████████████████████████████████
🎮 GAME STORE - RECIBO DE TRANSACCIÓN 🎮
█████████████████████████████████████████████████

[ DATOS DEL CLIENTE ]
> CLIENTE: ${cliente.nombre.toUpperCase()}
> CORREO:      ${cliente.email}

[ PRODUCTOS ]
  - ${nombresProductos}

> Alerta de daño: ${esFragil ? "CRÍTICO (Contiene hardware frágil)" : "Normal"}

[ DESGLOSE ]
  Subtotal:           ${subtotal.toFixed(2)}€
  Descuento aplicado: -${descuento.toFixed(2)}€
  Base Imponible:     ${subtotalConDescuento.toFixed(2)}€
  Tasas (IVA 21%):    +${impuestos.toFixed(2)}€
  Gastos de envio:      ${gastosEnvio === 0 ? "Gratis" : `+${gastosEnvio.toFixed(2)}€`}
-------------------------------------------------
💰 TOTAL A PAGAR:      ${total.toFixed(2)}€
█████████████████████████████████████████████████
🚀 Fecha estiamda de entrega: ${fechaEntrega}
█████████████████████████████████████████████████`;
}


module.exports = {
    validarStock,
    calcularSubtotal,
    calcularEnvio,
    generarFactura
}