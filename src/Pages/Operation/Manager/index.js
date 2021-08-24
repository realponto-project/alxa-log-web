import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import qs from 'qs'

import ManagerContainer from '../../../Containers/Operation/Manager'
import { getAll as getAllBranchs } from '../../../Services/Branch'
import {
  createOperations,
  getAll,
  updateOperations
} from '../../../Services/Operations'
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
  const [branchsData, setBranchsDataData] = useState({ rows: [] })
  const [loading, setLoading] = useState(true)
  const [offset, setoffset] = useState(1)
  const [operationData, setOperationData] = useState({ rows: [] })
  const [operationSelected, setOperationSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const { search, pathname } = useLocation()

  GAInitialize('/operation')

  const changeQueryParams = (search) => {
    return history.push({
      pathname,
      search
    })
  }

  const clearFilter = async () => {
    localStorage.removeItem('operationSearch')
    setSearchValue('')

    changeQueryParams('')
  }

  const getOperations = async () => {
    setLoading(true)
    try {
      const { data } = await getAll(parseQueryParams(search))
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

  const handleChangeTableEvent = ({ current }) => {
    const query = { offset: current - 1 }
    const queryParams = parseQueryParams(search)

    changeQueryParams(qs.stringify({ ...queryParams, ...query }))
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

  const handleFilter = async () => {
    if (isEmpty(searchValue)) {
      return null
    }

    localStorage.setItem('operationSearch', searchValue)

    changeQueryParams(`?name=${searchValue}`)
  }

  const handleFilterOnchange = (value) => {
    setSearchValue(value.target.value)
  }

  const handleSelectedOperation = (values) => {
    setOperationSelected(values)
  }

  const handleSubmit = async (values) => {
    try {
      await createOperations(values)
      getOperations()
      success('Operação criada com sucesso!')
    } catch (error) {
      errorMessage('Não foi possível criar a operação!')
      window.onerror(`createOperation: ${error.error}`, window.location.href)
    }
  }

  useEffect(() => {
    const searchLocalStorage = localStorage.getItem('operationSearch')
    getAllBranch({ limit: 400 })

    if (!search && searchLocalStorage) {
      changeQueryParams(`?name=${searchLocalStorage}`)

      setSearchValue(searchLocalStorage)
    }
  }, [])

  useEffect(() => {
    const queryParams = parseQueryParams(search)
    const current = pipe(pathOr('0', ['offset']), Number, add(1))(queryParams)

    setoffset(current)

    getOperations()
  }, [search])

  return (
    <ManagerContainer
      branchsSource={branchsData}
      clearFilter={clearFilter}
      goToDetail={(id) => history.push(`/logged/operation/detail/${id}`)}
      handleChangeTableEvent={handleChangeTableEvent}
      handleEdit={handleEdit}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      handleSelectedOperation={handleSelectedOperation}
      handleSubmit={handleSubmit}
      loading={loading}
      offset={offset}
      operationSelected={operationSelected}
      searchValue={searchValue}
      source={operationData}
    />
  )
}

export default withRouter(Manager)
