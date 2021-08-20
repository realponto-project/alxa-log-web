import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import qs from 'qs'

import ManagerContainer from '../../../Containers/VehicleType/Manager'
import {
  getAll,
  createVehicleType,
  updateVehicleType
} from '../../../Services/VehicleType'
import { add, isEmpty, pathOr, pipe } from 'ramda'
import GAInitialize from '../../../utils/ga'
import { parseQueryParams } from '../../../utils/queryParams'

const success = (text) => {
  message.success(text)
}

const errorMessage = (text) => {
  message.error(text)
}

const Manager = ({ history }) => {
  const [vehicleTypeData, setVehicleTypeData] = useState({ rows: [] })
  const [vehicleTypeSelected, setVehicleTypeSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(1)
  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  GAInitialize('/vehicle-types')

  const changeQueryParams = (search) => {
    return history.push({
      pathname,
      search
    })
  }

  const clearFilter = async () => {
    setSearchValue('')
    localStorage.removeItem('vehicleTypeSearch')
    setSearchValue('')

    changeQueryParams('')
  }

  const getVehicleTye = async () => {
    setLoading(true)

    try {
      const { data } = await getAll(parseQueryParams(search))
      setVehicleTypeData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`allVehiclesTypes: ${error.error}`, window.location.href)
    }
  }

  const handleChangeTableEvent = ({ current }) => {
    const query = { offset: current - 1 }
    const queryParams = parseQueryParams(search)

    changeQueryParams(qs.stringify({ ...queryParams, ...query }))
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

  const handleFilter = async () => {
    if (isEmpty(searchValue)) {
      return null
    }

    localStorage.setItem('vehicleTypeSearch', `?name=${searchValue}`)

    changeQueryParams(`?name=${searchValue}`)
  }

  const handleFilterOnchange = (value) => {
    setSearchValue(value.target.value)
  }

  const handleSelectedVehicleType = (fleet) => {
    setVehicleTypeSelected(fleet)
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

  useEffect(() => {
    const searchLocaStorage = localStorage.getItem('vehicleTypeSearch')
    const queryParams = parseQueryParams(search)

    if (!search && searchLocaStorage) {
      changeQueryParams(`?name=${searchLocaStorage}`)
    }

    setSearchValue(queryParams?.name)
  }, [])

  useEffect(() => {
    const queryParams = parseQueryParams(search)
    const current = pipe(pathOr('0', ['offset']), Number, add(1))(queryParams)

    setoffset(current)

    getVehicleTye()
  }, [search])

  return (
    <ManagerContainer
      clearFilter={clearFilter}
      handleChangeTableEvent={handleChangeTableEvent}
      handleEdit={handleEdit}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      handleSelectedVehicleType={handleSelectedVehicleType}
      handleSubmit={handleSubmit}
      loading={loading}
      offset={offset}
      searchValue={searchValue}
      source={vehicleTypeData}
      vehicleTypeSelected={vehicleTypeSelected}
    />
  )
}

export default withRouter(Manager)
