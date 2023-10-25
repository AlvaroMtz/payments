import express from 'express'

import initMongoDB from './config/database'

import paymentRoutes from './infraestructure/http/payment/paymentRoutes'
import providerRoutes from './infraestructure/http/provider/providerRoutes'

const app = express()
app.use(express.json())

app.use('/payments', paymentRoutes)
app.use('/providers', providerRoutes)

void initMongoDB()

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`)
})
