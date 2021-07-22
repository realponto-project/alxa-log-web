import axios from 'axios'

import axiosIntance from '../../utils/axiosInstance'
const baseUrl = `${process.env.REACT_APP_API_URL}/register`

export const getCompanyById = async (companyId) => {
  return await axiosIntance.get(`/companies/${companyId}`)
}

export const createCompany = async (values) => {
  return await axios.post(baseUrl, values)
}
