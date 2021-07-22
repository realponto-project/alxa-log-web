import pagarme from 'pagarme'

const createCardHash = (cardPayload) => {
  return pagarme.client
    .connect({ encryption_key: process.env.REACT_APP_ENCRYPTION_KEY })
    .then((client) => client.security.encrypt(cardPayload))
}

const cardValidation = (cardPayload) => {
  return pagarme.client
    .connect({ encryption_key: process.env.REACT_APP_ENCRYPTION_KEY })
    .then((client) => console.log(client))
}

export { createCardHash, cardValidation }
