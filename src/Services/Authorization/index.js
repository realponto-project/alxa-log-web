import axiosIntance from '../../utils/axiosInstance'

const createAuthorization = async (values) => {
  return await axiosIntance.post('/authorizations', values)
}

const updateAuthorization = async (values) => {
  return await axiosIntance.put(`/authorizations/${values.id}`, values)
}

const getById = async (id) => {
  return await axiosIntance.get(`/authorizations/${id}`)
}

export { 
  createAuthorization,
  updateAuthorization,
  getById,
}
