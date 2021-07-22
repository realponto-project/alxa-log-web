import axios from 'axios'

const baseUrl =`${process.env.REACT_APP_API_URL}/auth/login`

const auth = async (values) => {
  return await axios.post(baseUrl, values)
}

export default auth
