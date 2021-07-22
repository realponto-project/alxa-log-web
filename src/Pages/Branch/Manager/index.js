import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import { cnpj } from 'cpf-cnpj-validator'
import { validateBr } from 'js-brasil'
import GAInitialize from '../../../utils/ga'

import ManagerContainer from '../../../Containers/Branch/Manager'
import {   
  getAll, 
  createBranch, 
  updateBranch,  
} from '../../../Services/Branch'
import { isEmpty } from 'ramda'

const Manager = ({
  history,
}) => {
  const [branchData, setBranchData] = useState({ rows: [] })
  const [branchSelected, setbranchSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(1)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()
  GAInitialize(`/branch`)
  useEffect(() => {
    let query = { }
    const searchLocaStorage = localStorage.getItem('branchSearch')
    if(!search && searchLocaStorage) {
      history.push({
        pathname,
        search: cnpj.isValid(searchLocaStorage) ? `?document=${searchLocaStorage}` : `?name=${searchLocaStorage}`
      })
      setSearchValue(localStorage.getItem('branchSearch'))
      query = validateBr.cnh(searchValue) ? { document: searchLocaStorage.replace(/\D/g, '') } : { name: searchLocaStorage }

    }
    getBranchs(query)
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getBranchs = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(params)
      setBranchData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`branchs: ${error.error}`, window.location.href)

    }
  }

  const handleSubmit = async (values) => {
    try {
      await createBranch({...values, document: values.document.replace(/\D/g, '') })
      getBranchs()
      success('Cadastro da unidade realizado com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar o cadastro da unidade!')
      window.onerror(`createBranch: ${error.error}`, window.location.href)

    }
  }

  const handleEdit = async (values) => {
    try {
      await updateBranch({...values, document: values.document.replace(/\D/g, '') })
      getBranchs()
      success('Editado unidade com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição da unidade!')
      window.onerror(`editBranch: ${error.error}`, window.location.href)

    }
  }

  const handleSelectedBranch = driver => {
    setbranchSelected(driver)
  }

  const handleFilter = () => {
    if (isEmpty(searchValue)) {
      return null
    }

    const isValidCnpj = cnpj.isValid(searchValue)
    let searchLocal = `?name=${searchValue}`
    let query = { name: searchValue }
    
    if (isValidCnpj) {
      searchLocal = `?document=${searchValue}`
      query = { document: searchValue.replace(/\D/g, '')}
    }

    localStorage.setItem('branchSearch', searchValue)

    history.push({
      pathname,
      search: searchLocal
    })

    getBranchs(query)
    
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    setSearchValue('')
    localStorage.removeItem('branchSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
    setoffset(0)
    getBranchs({})
  }

  const handleChangeTableEvent = ({ current }) => {
    setoffset(current)
    let query = { offset: (current - 1) }
    if (searchValue) {
      const params = cnpj.isValid(searchValue) ? { document: searchValue.replace(/\D/g, '') } : { name: searchValue }
      query = { ...query, ...params }
    }

    getBranchs(query)
  }

  return (
    <ManagerContainer
      source={branchData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedBranch={handleSelectedBranch}
      branchSelected={branchSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
      offset={offset}
      handleChangeTableEvent={handleChangeTableEvent}
      goToDetail={id => history.push(`/logged/branch-detail/${id}`)}
    />
  )
}

export default withRouter(Manager)
