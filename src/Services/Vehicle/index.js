import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/vehicles', { params })
}

const createVehicle = async (values) => {
  return await axiosIntance.post('/vehicles', values)
}

const updateVehicle = async (values) => {
  return await axiosIntance.put(`/vehicles/${values.id}`, values)
}

const getById = async (values) => {
  return await axiosIntance.get(`/vehicles/${values.id}`)
}

const getAllVehicleTypes = async () => {
  return await axiosIntance.get(`/vehicle-types`)
}

export { 
  getAll, 
  getById,
  createVehicle, 
  updateVehicle, 
  getAllVehicleTypes,
}
