import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import qs from 'qs'

import ManagerContainer from '../../../Containers/Vehicle/Manager'
import {
  createVehicle,
  getAll,
  getAllVehicleTypes,
  updateVehicle
} from '../../../Services/Vehicle'
import { validateBr } from 'js-brasil'
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
  const [vehiclesData, setVehiclesData] = useState({ rows: [] })
  const [vehicleTypes, setVehicleTypes] = useState({ rows: [] })
  const [vehicleSelected, setVehicleSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(1)
  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  GAInitialize('/vehicles')

  const changeQueryParams = (search) => {
    return history.push({
      pathname,
      search
    })
  }

  const clearFilter = () => {
    setSearchValue('')
    localStorage.removeItem('vehicleSearch')
    setSearchValue('')
    changeQueryParams('')
  }

  const getVehicles = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(parseQueryParams(search))
      setVehiclesData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`allVehicles: ${error.error}`, window.location.href)
    }
  }

  const getVehicleTypes = async (params = {}) => {
    try {
      const { data } = await getAllVehicleTypes(params)
      setVehicleTypes(data)
    } catch (error) {
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
      await updateVehicle(values)
      getVehicles()
      success('Editado veículo com sucesso!')
    } catch (error) {
      window.onerror(`editVehicle: ${error.error}`, window.location.href)
      errorMessage('Não foi realizar a edição do veículo!')
    }
  }

  const handleFilter = () => {
    if (isEmpty(searchValue)) {
      return null
    }

    const queryLocal = validateBr.placa(searchValue)
      ? `?plate=${searchValue}`
      : `?fleet=${searchValue}`
    localStorage.setItem('vehicleSearch', searchValue)
    changeQueryParams(queryLocal)
  }

  const handleFilterOnchange = (value) => {
    setSearchValue(value.target.value)
  }

  const handleSelectedVehicle = (vehicle) => {
    setVehicleSelected(vehicle)
  }

  const handleSubmit = async (values) => {
    try {
      await createVehicle({
        ...values,
        plate: values.plate.toLocaleUpperCase(),
        fleet: values.fleet.toLocaleUpperCase()
      })
      success('Cadastro de veículo realizado com sucesso!')
      getVehicles()
    } catch (error) {
      window.onerror(`createVehicle: ${error.error}`, window.location.href)
      errorMessage('Não foi realizar o cadastro do veículo!')
    }
  }

  useEffect(() => {
    getVehicleTypes({ limit: 10000 })
    const searchLocalStorage = localStorage.getItem('vehicleSearch')
    if (!search && searchLocalStorage) {
      changeQueryParams(
        validateBr.placa(searchLocalStorage)
          ? `?plate=${searchLocalStorage}`
          : `?fleet=${searchLocalStorage}`
      )
      setSearchValue(searchLocalStorage)
    }
  }, [])

  useEffect(() => {
    const queryParams = parseQueryParams(search)
    const current = pipe(pathOr('0', ['offset']), Number, add(1))(queryParams)

    setoffset(current)

    getVehicles()
  }, [search])

  return (
    <ManagerContainer
      clearFilter={clearFilter}
      goToDetail={(id) => history.push(`/logged/vehicle/detail/${id}`)}
      handleChangeTableEvent={handleChangeTableEvent}
      handleEdit={handleEdit}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      handleSelectedVehicle={handleSelectedVehicle}
      handleSubmit={handleSubmit}
      loading={loading}
      offset={offset}
      searchValue={searchValue}
      source={vehiclesData}
      vehicleSelected={vehicleSelected}
      vehicleTypesSource={vehicleTypes.rows}
    />
  )
}

export default withRouter(Manager)
