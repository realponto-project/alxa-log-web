import axios from 'axios'

import axiosIntance from '../../utils/axiosInstance'

const getAll = async (params = {}) => {
  return await axiosIntance.get('/drivers', { params })
}

const createDriver = async (values) => {
  return await axiosIntance.post('/drivers', values)
}

const updateDriver = async (values) => {
  return await axiosIntance.put(`/drivers/${values.id}`, values)
}

const updateDriverWithoutAuth = async (id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/mobile/drivers/${id}`,
    values
  )
}

const getById = async (id) => {
  return await axiosIntance.get(`/drivers/${id}`)
}

const createDriverIncident = async (values) => {
  return await axiosIntance.post('/drivers-incidents', values)
}

const getIncidentsSummary = async (id) => {
  return await axiosIntance.get(`/drivers-incidents/${id}`)
}

export {
  getAll,
  getById,
  createDriver,
  updateDriver,
  createDriverIncident,
  getIncidentsSummary,
  updateDriverWithoutAuth
}
