import axios from 'axios'

const getById = async (id, values) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/mobile/drivers/${id}`,
    values
  )
}

const updateDriverWithoutAuth = async (id, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/mobile/drivers/${id}`,
    values
  )
}

export { getById, updateDriverWithoutAuth }
