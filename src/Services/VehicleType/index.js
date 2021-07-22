import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/vehicle-types', { params })
}

const createVehicleType = async (values) => {
  return await axiosIntance.post('/vehicle-types', values)
}

const updateVehicleType = async (values) => {
  return await axiosIntance.put(`/vehicle-types/${values.id}`, values)
}

const getById = async (values) => {
  return await axiosIntance.get(`/vehicle-types/${values.id}`)
}

export { 
  getAll, 
  getById,
  createVehicleType, 
  updateVehicleType, 
}
