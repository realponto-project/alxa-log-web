import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Operation/Manager'
import { getAll as getAllBranchs } from '../../../Services/Branch'
import { 
  createOperations, 
  getAll, 
  updateOperations
} from '../../../Services/Operations'
import { isEmpty } from 'ramda'
import GAInitialize from '../../../utils/ga'

const Manager = ({
  history,
}) => {
  const [operationData, setOperationData] = useState({ rows: [] })
  const [branchsData, setBranchsDataData] = useState({ rows: [] })

  const [operationSelected, setOperationSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(1)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()
  GAInitialize(`/operation`)

  useEffect(() => {
    let query = {}
    const searchLocalStorage = localStorage.getItem('operationSearch')
    getAllBranch({ limit: 400 })

    if(!search && searchLocalStorage) {
      history.push({
        pathname,
        search: `?name=${searchLocalStorage}`
      })
      setSearchValue(searchLocalStorage)
      query = {
        name: searchLocalStorage
      }
    }
    getOperations(query)
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getOperations = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(params)
      setOperationData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`allOperations: ${error.error}`, window.location.href)
    }
  }

  const getAllBranch = async (params) => {
    try {
      const { data } = await getAllBranchs(params)
      setBranchsDataData(data)
    } catch (error) {
      window.onerror(`allBranchs: ${error.error}`, window.location.href)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createOperations(values)
      getOperations()
      success('Operação criada com sucesso!')
    } catch (error) {
      errorMessage('Não foi criar a operação!')
      window.onerror(`createOperation: ${error.error}`, window.location.href)
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateOperations(values)
      getOperations()
      success('Operação editada com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição da operação!')
      window.onerror(`updateOperation: ${error.error}`, window.location.href)
    }
  }

  const handleSelectedOperation = values => {
    setOperationSelected(values)
  }

  const handleFilter = async () => {
    if (isEmpty(searchValue)) {
      return null
    }

    localStorage.setItem('operationSearch', searchValue)
    history.push({
      pathname,
      search: `?name=${searchValue}`
    })

    getOperations({ name: searchValue})

  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = async () => {
    setSearchValue('')
    localStorage.removeItem('operationSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
    setoffset(0)
    getOperations({})
  }

  const handleChangeTableEvent = ({ current }) => {
    setoffset(current)
    let query = { offset: (current - 1)  }
    if (searchValue) {
      query = { ...query, name: searchValue }
    }

    getOperations(query)
  }


  return (
    <ManagerContainer
      source={operationData}
      branchsSource={branchsData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedOperation={handleSelectedOperation}
      operationSelected={operationSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
      goToDetail={id => history.push(`/logged/operation-detail/${id}`)}
    />
  )
}

export default withRouter(Manager)
