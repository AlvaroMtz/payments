import dotenv from 'dotenv'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const selectPaymentGateway = async (selectedProvider: string) => {
  const apiKey = process.env[selectedProvider.toUpperCase() + '_API_KEY']
  if (apiKey == null) {
    console.error(`API key para ${selectedProvider} no encontrada.`)
    return null
  }

  let PaymentGatewayAdapter

  try {
    PaymentGatewayAdapter = await import(`../../../adapters/${selectedProvider}/${selectedProvider}Adapter`)
  } catch (error) {
    console.error(`Error al importar el adaptador para ${selectedProvider}.`, error)
    return null
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (PaymentGatewayAdapter) {
    // eslint-disable-next-line new-cap
    return new PaymentGatewayAdapter.default({ apiKey })
  } else {
    return null
  }
}

export default selectPaymentGateway
