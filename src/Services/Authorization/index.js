import axios from 'axios'

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

const getAll = async (params = {}) => {
  return await axiosIntance.get('/authorizations', { params })
}

const getAllAuthorizations = async (params) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/mobile/authorization`,
    { params }
  )
}

const createMaintenanceOrderByAuthorizationId = async (values) => {
  return await axiosIntance.post('/maintenance-order-by-authorization', values)
}

export {
  getAll,
  getAllAuthorizations,
  createMaintenanceOrderByAuthorizationId,
  createAuthorization,
  updateAuthorization,
  getById
}
