const express = require('express');
const app = express()
const dayjs = require('dayjs')
const fs = require('fs/promises')
const { generarFactura } = require('./src/controllers/factura.controllers');
const PORT = 3000
const path = require('path');

app.use(express.json())


app.get('/factura/:archivo', async (req, res) => {
    const nombreArchivo = req.params.archivo + '.json'

    try {
        const clienteCrudo = await fs.readFile(path.join(__dirname, 'src', 'data', 'cliente.json'), 'utf-8')
        const cliente = JSON.parse(clienteCrudo)
        if (!cliente){
            return res.status(404).send('<h1>❌ Error 404</h1><p>El cliente solicitado no existe en la base de datos.</p>')
        }
        const carritoCrudo = await fs.readFile(path.join(__dirname, 'src', 'data', nombreArchivo), 'utf-8')
        const carrito = JSON.parse(carritoCrudo)
        const factura = generarFactura(cliente, carrito)

        res.send(`<pre style="font-family: monospace; background: #f4f4f4; padding: 20px; border-radius: 8px;">${factura}</pre>`)
    } catch (error) {
        if (error.code === 'ENOENT') {
                res.status(404).send('<h1>❌ Error 404</h1><p>El carrito solicitado no existe en la base de datos.</p>');
            } else {
                res.status(400).send(`<h1>❌ Operación denegada</h1><p>${error.message}</p>`);
            }
    }
})

app.use((req, res) => {
    return res.status(404).json("Route not found")
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}/factura/carrito1`);
    
})