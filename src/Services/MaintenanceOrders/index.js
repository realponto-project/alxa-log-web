import axiosIntance from '../../utils/axiosInstance'
import axios from 'axios'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/maintenance-orders', { params })
}

const createMaintenanceOrder = async (values) => {
  return await axiosIntance.post('/maintenance-orders', values)
}

const updateMaintenanceOrder = async (values) => {
  return await axiosIntance.put(`/maintenance-orders/${values.id}`, values)
}

const getById = async (id) => {
  return await axiosIntance.get(`/maintenance-orders/${id}`)
}

const updateEvents = async (id, values) => {
  return await axiosIntance.put(`/maintenance-order-events/${id}`, values)
}

const getMobileQrCode = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/qrcode-detail/${id}`)
}

const getByPlate = async (params = {}) => {
  return await axiosIntance.get('/maintenance-order-events', { params })
}

const getMaintenanceCompanyId = async (params = {}) => {
  return await axiosIntance.get('/maintenance-orders-company', { params })
}

const getMaintenanceOperationId = async (params = {}) => {
  return await axiosIntance.get('/maintenance-orders-operation', { params })
}

export { 
  getAll, 
  getById,
  createMaintenanceOrder, 
  updateMaintenanceOrder,
  updateEvents,
  getMobileQrCode,
  getByPlate,
  getMaintenanceCompanyId,
  getMaintenanceOperationId
}
