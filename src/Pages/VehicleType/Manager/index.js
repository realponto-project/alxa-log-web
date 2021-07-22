import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/VehicleType/Manager'
import {   
  getAll, 
  createVehicleType,
  updateVehicleType  
} from '../../../Services/VehicleType'
import { isEmpty } from 'ramda'
import GAInitialize from '../../../utils/ga'

const Manager = ({
  history,
}) => {
  const [vehicleTypeData, setVehicleTypeData] = useState({ rows: [] })
  const [vehicleTypeSelected, setVehicleTypeSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(1)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()
  GAInitialize(`/vehicle-types`)

  useEffect(() => {
    let query = {} 
    const searchLocaStorage = localStorage.getItem('vehicleTypeSearch')
  
    if(!search && searchLocaStorage) {
      history.push({
        pathname,
        search: `?name=${searchLocaStorage}`
      })
      setSearchValue(searchLocaStorage)
      query = { name: searchLocaStorage }
    }
    getVehicleTye(query)
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getVehicleTye = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(params)
      setVehicleTypeData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`allVehiclesTypes: ${error.error}`, window.location.href)

    }
  }

  const handleSubmit = async (values) => {
    try {
      await createVehicleType(values)
      getVehicleTye()
      success('Cadastro do tipo de veículo realizado com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar o cadastro do tipo de veículo!')
      window.onerror(`createVehicleTypes: ${error.error}`, window.location.href)
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateVehicleType(values)
      getVehicleTye()
      success('Editado tipo de veículo com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição do tipo de veículo!')
      window.onerror(`editVehicleTypes: ${error.error}`, window.location.href)
    }
  }

  const handleSelectedVehicleType = fleet => {
    setVehicleTypeSelected(fleet)
  }

  const handleFilter = async () => {
    if(isEmpty(searchValue)) {
      return null
    }

    localStorage.setItem('vehicleTypeSearch', `?name=${searchValue}`)
    history.push({
      pathname,
      search: `?name=${searchValue}`
    })

    getVehicleTye({ name: searchValue })
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = async () => {
    setSearchValue('')
    localStorage.removeItem('vehicleTypeSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
    setoffset(0)
    getVehicleTye({})

  }

  const handleChangeTableEvent = ({ current }) => {
    setoffset(current)
    let query = { offset: (current - 1) }
    if (searchValue) {
      query = { ...query, name: searchValue }
    }

    getVehicleTye(query)
  }

  return (
    <ManagerContainer
      source={vehicleTypeData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedVehicleType={handleSelectedVehicleType}
      vehicleTypeSelected={vehicleTypeSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
      offset={offset}
      handleChangeTableEvent={handleChangeTableEvent}
    />
  )
}

export default withRouter(Manager)
