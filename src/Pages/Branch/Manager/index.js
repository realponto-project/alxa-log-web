import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import { cnpj } from 'cpf-cnpj-validator'
import qs from 'qs'

import GAInitialize from '../../../utils/ga'
import ManagerContainer from '../../../Containers/Branch/Manager'
import { getAll, createBranch, updateBranch } from '../../../Services/Branch'
import { add, isEmpty, pathOr, pipe } from 'ramda'
import { parseQueryParams } from '../../../utils/queryParams'

const success = (text) => {
  message.success(text)
}

const errorMessage = (text) => {
  message.error(text)
}

const Manager = ({ history }) => {
  const [branchData, setBranchData] = useState({ rows: [] })
  const [branchSelected, setbranchSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [offset, setoffset] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const { search, pathname } = useLocation()

  GAInitialize('/branch')

  const changeQueryParams = (search) => {
    return history.push({
      pathname,
      search
    })
  }

  const clearFilter = () => {
    localStorage.removeItem('branchSearch')
    setSearchValue('')

    changeQueryParams('')
  }

  const getBranchs = async () => {
    setLoading(true)
    try {
      const { data } = await getAll(parseQueryParams(search))
      setBranchData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`branchs: ${error.error}`, window.location.href)
    }
  }

  const handleChangeTableEvent = ({ current }) => {
    const query = { offset: current - 1 }
    const queryParams = parseQueryParams(search)

    changeQueryParams(qs.stringify({ ...queryParams, ...query }))
  }

  const handleEdit = async (values) => {
    try {
      await updateBranch({
        ...values,
        document: values.document.replace(/\D/g, '')
      })
      getBranchs()
      success('Editado unidade com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição da unidade!')
      window.onerror(`editBranch: ${error.error}`, window.location.href)
    }
  }

  const handleFilter = () => {
    if (isEmpty(searchValue)) {
      return null
    }

    const isValidCnpj = cnpj.isValid(searchValue)
    let searchLocal = `?name=${searchValue}`

    if (isValidCnpj) {
      searchLocal = `?document=${searchValue.replace(/\D/g, '')}`
    }

    localStorage.setItem('branchSearch', searchValue)

    changeQueryParams(searchLocal)
  }

  const handleFilterOnchange = (value) => {
    setSearchValue(value.target.value)
  }

  const handleSelectedBranch = (driver) => {
    setbranchSelected(driver)
  }

  const handleSubmit = async (values) => {
    try {
      await createBranch({
        ...values,
        document: values.document.replace(/\D/g, '')
      })
      getBranchs()
      success('Cadastro da unidade realizado com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar o cadastro da unidade!')
      window.onerror(`createBranch: ${error.error}`, window.location.href)
    }
  }

  useEffect(() => {
    const searchLocaStorage = localStorage.getItem('branchSearch')
    if (!search && searchLocaStorage) {
      changeQueryParams(
        cnpj.isValid(searchLocaStorage)
          ? `?document=${searchLocaStorage}`
          : `?name=${searchLocaStorage}`
      )

      setSearchValue(localStorage.getItem('branchSearch'))
    }
  }, [])

  useEffect(() => {
    const queryParams = parseQueryParams(search)
    const current = pipe(pathOr('0', ['offset']), Number, add(1))(queryParams)

    setoffset(current)

    getBranchs()
  }, [search])

  return (
    <ManagerContainer
      branchSelected={branchSelected}
      clearFilter={clearFilter}
      goToDetail={(id) => history.push(`/logged/branch/detail/${id}`)}
      handleChangeTableEvent={handleChangeTableEvent}
      handleEdit={handleEdit}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      handleSelectedBranch={handleSelectedBranch}
      handleSubmit={handleSubmit}
      loading={loading}
      offset={offset}
      searchValue={searchValue}
      source={branchData}
    />
  )
}

export default withRouter(Manager)
