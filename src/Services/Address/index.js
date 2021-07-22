import cep from 'cep-promise'

const getAddress = (zipcode) => {
  return cep(zipcode)
}

export default getAddress
