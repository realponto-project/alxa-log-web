import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/drivers', { params })
}

const createDriver = async (values) => {
  return await axiosIntance.post('/drivers', values)
}

const getSummaryExpire = async () => {
  return await axiosIntance.get('/drivers-summary-expire')
}

const updateDriver = async (values) => {
  return await axiosIntance.put(`/drivers/${values.id}`, values)
}

const getById = async (id) => {
  return await axiosIntance.get(`/drivers/${id}`)
}

const createDriverIncident = async (values) => {
  return await axiosIntance.post('/drivers-incidents', values)
}

const editDriverIncident = async (values) => {
  return await axiosIntance.put(`/drivers-incidents/${values.id}`, values)
}

const getIncidentsSummary = async (id) => {
  return await axiosIntance.get(`/drivers-incidents-summary/${id}`)
}

const getAllIncidentsByDriverId = async (id, params = {}) => {
  return await axiosIntance.get(`/drivers-incidents/${id}`, { params })
}

export {
  getAll,
  getById,
  getSummaryExpire,
  createDriver,
  updateDriver,
  createDriverIncident,
  getIncidentsSummary,
  getAllIncidentsByDriverId,
  editDriverIncident
}
