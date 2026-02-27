# 🛒 Game Store - Procesador de Pedidos Backend

Este proyecto consiste en un script de **Node.js** diseñado para gestionar el backend de una tienda de videojuegos. El sistema procesa carritos de compra, realiza cálculos de impuestos, aplica descuentos dinámicos y estima fechas de entrega.

**Asignatura:** Desarrollo Web en Entorno Servidor  
**Profesor:** Rubén Juárez  
**Alumno:** Jorge Sánchez

---

## 📋 Descripción del Proyecto
El alumno actúa como desarrollador backend para implementar la lógica de un procesador de pedidos (`index.js`). El objetivo es automatizar el flujo de información de una compra, desde la lectura de datos del cliente y productos hasta la generación de un ticket de transacción profesional.

## 🛠️ Requisitos Técnicos Cumplidos

### 1. Entorno y Ejecución
- **Runtime:** El script se ejecuta mediante el comando `node index.js` en la terminal.
- **Servidor:** Implementación de un servidor web utilizando el framework **Express**.

### 2. Variables y Lógica de Datos
- **Constantes (`const`):** Se utilizan para valores fijos y configuraciones de negocio como el IVA (21%), umbrales de descuento y gastos de envío.
- **Variables (`let`):** Utilizadas para valores mutables durante el cálculo, como el total acumulado y los descuentos aplicables.
- **Estructuras de Datos:** - **Objetos:** Para representar la información del cliente (nombre, email).
  - **Arrays de Objetos:** Para gestionar la lista de productos en el carrito.

### 3. Lógica de Negocio y Cálculos
- **Normalización:** Uso de `.toUpperCase()` para estandarizar el nombre del cliente en el ticket final.
- **Validación de Stock:** Implementación de una función que verifica mediante `.every()` si hay existencias suficientes para cada producto solicitado.
- **Detección de Fragilidad:** Uso de `.some()` para identificar si el pedido contiene hardware sensible y requiere embalaje especial.
- **Operadores Aritméticos:** Aplicación de la fórmula de impuestos y descuentos.

### 4. Integración de Librerías y Control de Flujo
- **Dayjs