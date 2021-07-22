import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/companies', { params })
}

const createBranch = async (values) => {
  return await axiosIntance.post('/companies', values)
}

const updateBranch = async (values) => {
  return await axiosIntance.put(`/companies/${values.id}`, values)
}

const getById = async (id) => {
  return await axiosIntance.get(`/companies/${id}`)
}

const getSummary = async (id) => {
  return await axiosIntance.get(`/companies-summary-orders/${id}`)
}

export { 
  getAll, 
  getById,
  createBranch, 
  updateBranch, 
  getSummary,
}
