import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/operations', { params })
}

const createOperations = async (values) => {
  return await axiosIntance.post('/operations', values)
}

const updateOperations = async (values) => {
  return await axiosIntance.put(`/operations/${values.id}`, values)
}

const getById = async (id) => {
  return await axiosIntance.get(`/operations/${id}`)
}

const getSummary = async (id) => {
  return await axiosIntance.get(`/operations-summary-orders/${id}`)
}

export { 
  getAll, 
  getById,
  createOperations, 
  updateOperations,
  getSummary,
}
