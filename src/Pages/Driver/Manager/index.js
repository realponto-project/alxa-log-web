import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import { validateBr } from 'js-brasil'
import qs from 'qs'

import GAInitialize from '../../../utils/ga'
import ManagerContainer from '../../../Containers/Driver/Manager'
import { getAll, createDriver, updateDriver } from '../../../Services/Driver'
import { add, isEmpty, pathOr, pipe } from 'ramda'
import { parseQueryParams } from '../../../utils/queryParams'

const success = (text) => {
  message.success(text)
}

const errorMessage = (text) => {
  message.error(text)
}

const Manager = ({ history }) => {
  const [driverData, setDriverData] = useState({ rows: [] })
  const [driverSelected, setDriverSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(1)
  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  GAInitialize('/driver')

  const changeQueryParams = (search) => {
    return history.push({
      pathname,
      search
    })
  }

  const clearFilter = () => {
    localStorage.removeItem('driverSearch')
    setSearchValue('')

    changeQueryParams('')
  }

  const getDrivers = async () => {
    setLoading(true)
    try {
      const { data } = await getAll(parseQueryParams(search))
      setDriverData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`allDrivers: ${error.error}`, window.location.href)
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateDriver({
        ...values,
        driverLicense: values.driverLicense.replace(/\D/g, ''),
        phone: values.phone.replace(/\D/g, '')
      })
      getDrivers()
      success('Editado motorista com sucesso!')
    } catch (error) {
      window.onerror(`updateDriver: ${error.error}`, window.location.href)
      errorMessage('Não foi realizar a edição do motorista!')
    }
  }

  const handleFilter = () => {
    if (isEmpty(searchValue)) {
      return null
    }

    const isValidCnh = validateBr.cnh(searchValue)

    const searchLocal = isValidCnh
      ? `?driverLicense=${searchValue}`
      : `?name=${searchValue}`

    localStorage.setItem('driverSearch', searchValue)

    changeQueryParams(searchLocal)
  }

  const handleFilterOnchange = (value) => {
    setSearchValue(value.target.value)
  }

  const handleChangeTableEvent = ({ current }) => {
    const query = { offset: current - 1 }
    const queryParams = parseQueryParams(search)

    changeQueryParams(qs.stringify({ ...queryParams, ...query }))
  }

  const handleSelectedDriver = (driver) => {
    setDriverSelected(driver)
  }

  const handleSubmit = async (values) => {
    try {
      console.log(values)
      await createDriver({
        ...values,
        driverLicense: values.driverLicense.replace(/\D/g, ''),
        phone: values.phone.replace(/\D/g, ''),
        rg: values.rg.replace(/\D/g, ''),
        cpf: values.cpf.replace(/\D/g, ''),
        expireASO: values.expireASO._d,
        expireDriverLicense: values.expireDriverLicense._d,
        expireProtocolInsuranceCompany: values.expireProtocolInsuranceCompany._d
      })
      getDrivers()
      success('Cadastro de motorista realizado com sucesso!')
    } catch (error) {
      window.onerror(`createDriver: ${error.error}`, window.location.href)
      errorMessage('Não foi realizar o cadastro do motorista!')
    }
  }

  useEffect(() => {
    const searchLocalStorage = localStorage.getItem('driverSearch')
    const queryParams = parseQueryParams(search)

    if (!search && searchLocalStorage) {
      changeQueryParams(
        validateBr.cnh(searchValue)
          ? `?driverLicense=${searchLocalStorage}`
          : `?name=${searchLocalStorage}`
      )
    }

    setSearchValue(queryParams?.name ?? queryParams?.driverLicense ?? '')
  }, [])

  useEffect(() => {
    const queryParams = parseQueryParams(search)
    const current = pipe(pathOr('0', ['offset']), Number, add(1))(queryParams)

    setoffset(current)

    getDrivers()
  }, [search])

  return (
    <ManagerContainer
      clearFilter={clearFilter}
      driverSelected={driverSelected}
      goToDetail={(id) => history.push(`/logged/driver-detail/${id}`)}
      handleChangeTableEvent={handleChangeTableEvent}
      handleEdit={handleEdit}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      handleSelectedDriver={handleSelectedDriver}
      handleSubmit={handleSubmit}
      loading={loading}
      offset={offset}
      searchValue={searchValue}
      source={driverData}
    />
  )
}

export default withRouter(Manager)
