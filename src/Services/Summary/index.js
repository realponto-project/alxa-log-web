import axiosIntance from '../../utils/axiosInstance'

const getByStatusOperation = async (params = {}) => {
  return await axiosIntance.get('/maintenance-orders-summary-operation', { params })
}

const getByStatusCompany = async (params = {}) => {
  return await axiosIntance.get('/maintenance-orders-summary-company', { params })
}

const getByStatus = async (params = {}) => {
  return await axiosIntance.get('/maintenance-orders-summary-status', { params })
}

export { 
  getByStatus, 
  getByStatusCompany,
  getByStatusOperation, 
}
