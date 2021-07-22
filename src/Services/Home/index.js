import axiosIntance from '../../utils/axiosInstance'

const getDashboardValues = async () => {
  return await axiosIntance.get('/summary-home-basic')
}

export default getDashboardValues
