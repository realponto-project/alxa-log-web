import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import { validateBr } from 'js-brasil'
import GAInitialize from '../../../utils/ga'

import ManagerContainer from '../../../Containers/Driver/Manager'
import {   
  getAll, 
  createDriver, 
  updateDriver,  
} from '../../../Services/Driver'
import { isEmpty } from 'ramda'

const Manager = ({
  history,
}) => {
  const [driverData, setDriverData] = useState({ rows: [] })
  const [driverSelected, setDriverSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(1)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()
  GAInitialize(`/driver`)

  useEffect(() => {
    let query = {} 
    const searchLocalStorage = localStorage.getItem('driverSearch')
    if(!search && searchLocalStorage) {
      history.push({
        pathname,
        search: validateBr.cnh(searchValue) ? `?driverLicense=${searchLocalStorage}` : `?name=${searchLocalStorage}`
      })
      setSearchValue(searchLocalStorage)
      query = validateBr.cnh(searchValue) ? { driverLicense: searchLocalStorage.replace(/\D/g, '') } : { name: searchLocalStorage }
    }
    getDrivers(query)
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getDrivers = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(params)
      setDriverData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`allDrivers: ${error.error}`, window.location.href)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createDriver({...values, driverLicense: values.driverLicense.replace(/\D/g, ''), phone: values.phone.replace(/\D/g, '') })
      getDrivers()
      success('Cadastro de motorista realizado com sucesso!')
    } catch (error) {
      window.onerror(`createDriver: ${error.error}`, window.location.href)
      errorMessage('Não foi realizar o cadastro do motorista!')
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateDriver({...values, driverLicense: values.driverLicense.replace(/\D/g, ''), phone: values.phone.replace(/\D/g, '') })
      getDrivers()
      success('Editado motorista com sucesso!')
    } catch (error) {
      window.onerror(`updateDriver: ${error.error}`, window.location.href)
      errorMessage('Não foi realizar a edição do motorista!')
    }
  }

  const handleSelectedDriver = driver => {
    setDriverSelected(driver)
  }

  const handleFilter = () => {
    if (isEmpty(searchValue)) {
      return null
    }

    const isValidCnh = validateBr.cnh(searchValue)
    let query = {
      name: searchValue
    }

    const searchLocal = isValidCnh ? `?driverLicense=${searchValue}` : `?name=${searchValue}`

    if (isValidCnh) {
      query = {
        driverLicense: searchValue.replace(/\D/g, '')
      }
    
    }

    localStorage.setItem('driverSearch', searchValue)
    history.push({
      pathname,
      search: searchLocal
    })

    getDrivers(query)
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    setSearchValue('')
    localStorage.removeItem('driverSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
    setoffset(0)
    getDrivers({})
  }

  const handleChangeTableEvent = ({ current }) => {
    setoffset(current)
    let query = { offset: (current - 1) }
    if (searchValue) {
      const params = validateBr.cnh(searchValue) ? { driverLicense: searchValue.replace(/\D/g, '') } : { name: searchValue }
      query = { ...query, ...params }
    }

    getDrivers(query)
  }


  return (
    <ManagerContainer
      source={driverData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedDriver={handleSelectedDriver}
      driverSelected={driverSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
      goToDetail={id => history.push(`/logged/driver-detail/${id}`)}
    />
  )
}

export default withRouter(Manager)
