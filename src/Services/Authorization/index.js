import axiosIntance from '../../utils/axiosInstance'

const createAuthorization = async (values) => {
  return await axiosIntance.post('/authorizations', values)
}

const getById = async (id) => {
  return await axiosIntance.get(`/authorizations/${id}`)
}

export { 
  createAuthorization,
  getById,
}
