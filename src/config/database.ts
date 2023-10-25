import mongoose from 'mongoose'
const uri = 'mongodb://localhost:27017/payment'

async function initMongoDB (): Promise<void> {
  try {
    await mongoose.connect(uri)
    console.log('Conexión a MongoDB establecida')
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error)
  }
}

export default initMongoDB
