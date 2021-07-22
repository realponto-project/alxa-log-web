const PAGARME_ENCRYPTION_KEY =
  process && process.env.REACT_APP_PAGARME_ENVIRONMENT === 'live'
    ? process.env.REACT_APP_PAGARME_ENCRYPTION_KEY_PRD
    : ''

const PAGARME_POSTBACK_URL =
  process && process.env.REACT_APP_PAGARME_ENVIRONMENT === 'live'
    ? process.env.REACT_PAGARME_POSTBACK_URL
    : 'http://localhost:3003'

export { PAGARME_ENCRYPTION_KEY, PAGARME_POSTBACK_URL }
