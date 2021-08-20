import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import qs from 'qs'
import {
  add,
  filter,
  forEach,
  includes,
  isEmpty,
  keys,
  length,
  lt,
  pathOr,
  pipe,
  __
} from 'ramda'
import moment from 'moment'
import 'moment/locale/pt-br'

import ManagerContainer from '../../../Containers/Maintenance/Manager'
import { getAll } from '../../../Services/Vehicle'
import { getAll as getAllBranchs } from '../../../Services/Branch'
import { getAll as getAllDrivers } from '../../../Services/Driver'
import { getAll as getAllOperations } from '../../../Services/Operations'
import {
  createMaintenanceOrder,
  getAll as getAllMaintenanceOrders,
  updateMaintenanceOrder,
  updateMaintenanceOrderCancel
} from '../../../Services/MaintenanceOrders'
import GAInitialize from '../../../utils/ga'
import { parseQueryParams } from '../../../utils/queryParams'

const success = (text) => {
  message.success(text)
}

const errorMessage = (text) => {
  message.error(text)
}

const defaultValueCheckBoxDefaultValues = {
  dates: [],
  status: [],
  services: [],
  priorities: []
}
const defaultValueSearchValue = {
  plate: null,
  dates: [],
  status: [],
  services: [],
  priorities: []
}

const Manager = ({ history, match }) => {
  const [branchsData, setBranchsData] = useState({ rows: [] })
  const [driversData, setDriversData] = useState({ rows: [] })
  const [checkBoxDefaultValues, setCheckBoxDefaultValues] = useState(
    defaultValueCheckBoxDefaultValues
  )
  const [loading, setLoading] = useState(true)
  const [maintenanceOrdersData, setMaintenanceOrdersData] = useState({
    rows: []
  })
  const [maintenanceSelected, setMaintenanceSelected] = useState(null)
  const [moreFilters, setMoreFilters] = useState(false)
  const [offset, setoffset] = useState(1)
  const [operationsData, setOperationsData] = useState({ rows: [] })
  const [searchValue, setSearchValue] = useState(defaultValueSearchValue)
  const [vehiclesData, setVehiclesData] = useState({ rows: [] })
  const { search, pathname } = useLocation()

  GAInitialize('/maintenance-order')

  const changeQueryParams = (search) => {
    return history.push({
      pathname,
      search
    })
  }

  const clearFilter = async () => {
    localStorage.removeItem('searchValue')
    setSearchValue(defaultValueSearchValue)
    setCheckBoxDefaultValues(defaultValueCheckBoxDefaultValues)
    changeQueryParams('')
  }

  const getAllBranch = async (params = {}) => {
    try {
      const { data } = await getAllBranchs(params)
      setBranchsData(data)
    } catch (error) {
      window.onerror(`allBranchs: ${error.error}`, window.location.href)
    }
  }

  const getAllDriver = async (params = {}) => {
    try {
      const { data } = await getAllDrivers(params)
      setDriversData(data)
    } catch (error) {
      window.onerror(`allDrivers: ${error.error}`, window.location.href)
    }
  }

  const getAllMaintenances = async (params = {}) => {
    try {
      const { data } = await getAllMaintenanceOrders(parseQueryParams(search))
      setMaintenanceOrdersData(data)
    } catch (error) {
      window.onerror(
        `allMaintenaceOrders: ${error.error}`,
        window.location.href
      )
    }
  }

  const getAllOperation = async (params = {}) => {
    try {
      const { data } = await getAllOperations(params)
      setOperationsData(data)
    } catch (error) {
      window.onerror(`allOperation: ${error.error}`, window.location.href)
    }
  }

  const getVehicles = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(params)
      setVehiclesData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`allVehicles: ${error.error}`, window.location.href)
    }
  }

  const handleCancelOrder = async (values) => {
    try {
      await updateMaintenanceOrderCancel(values)
      getAllMaintenances()
      success('Manuntenção cancelada com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar o cancelamento da manutenção!')
      window.onerror(
        `updateMaintenanceOrder: ${error.error}`,
        window.location.href
      )
    }
  }

  const handleChangeTableEvent = ({ current }) => {
    const query = { offset: current - 1 }
    const queryParams = parseQueryParams(search)

    changeQueryParams(qs.stringify({ ...queryParams, ...query }))
  }

  const handleEdit = async (values) => {
    try {
      await updateMaintenanceOrder(values)
      getAllMaintenances()
      success('Manuntenção editada com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição da manutenção!')
      window.onerror(
        `updateMaintenanceOrder: ${error.error}`,
        window.location.href
      )
    }
  }

  const handleFilter = () => {
    const queryFilters = qs.stringify(searchValue)
    localStorage.setItem('searchValue', queryFilters)
    changeQueryParams(queryFilters)
  }

  const handleFilterOnchange = ({ target }) => {
    const { name, value } = target
    let values = value
    if (name === 'dates' && value && value.length > 0) {
      values = [
        new Date(value[0]).toISOString(),
        new Date(value[1]).toISOString()
      ]
      setCheckBoxDefaultValues({
        ...checkBoxDefaultValues,
        dates: value
      })
    }

    if (name === 'plate') {
      values = value.trim()
    }

    setSearchValue({
      ...searchValue,
      [name]: values
    })
  }

  const handleSelectedMaintenance = (values) => {
    setMaintenanceSelected(values)
  }

  const handleShowFilters = () => setMoreFilters(!moreFilters)

  const handleSubmit = async (values) => {
    try {
      await createMaintenanceOrder({
        ...values,
        maintenanceDate: new Date(values.maintenanceDate)
      })
      getAllMaintenances()
      success('Manutenção criada com sucesso!')
    } catch (error) {
      window.onerror(
        `createMaintenanceOrder: ${error.error}`,
        window.location.href
      )
      errorMessage('Não foi criar a manutenção!')
    }
  }

  useEffect(() => {
    getVehicles({ limit: 100000 })
    getAllDriver({ limit: 100000 })
    getAllBranch({ limit: 400 })
    getAllOperation({ limit: 100000 })

    if (!search && localStorage.getItem('searchValue')) {
      const searchValueLocal = localStorage.getItem('searchValue')

      changeQueryParams(searchValueLocal)

      const searchParser = qs.parse(searchValueLocal)
      setSearchValue(searchParser)
      setCheckBoxDefaultValues({
        ...searchParser,
        dates:
          searchParser?.dates?.length > 0
            ? [moment(searchParser.dates[0]), moment(searchParser.dates[1])]
            : []
      })
    } else {
      const urlParams = qs.parse(search, { arrayFormat: 'index' })
      const checkBoxValues = {}
      forEach(
        (key) => (checkBoxValues[key] = urlParams[key]),
        filter(
          includes(__, ['dates', 'status', 'services', 'priorities']),
          keys(urlParams)
        )
      )
      setSearchValue(checkBoxValues)
      if (!isEmpty(checkBoxValues)) setMoreFilters(true)
    }
  }, [])

  useEffect(() => {
    const queryParams = parseQueryParams(search)
    const current = pipe(pathOr('0', ['offset']), Number, add(1))(queryParams)

    setoffset(current)

    getAllMaintenances()
  }, [search])

  return (
    <ManagerContainer
      branchsSource={branchsData.rows}
      checkBoxDefaultValues={checkBoxDefaultValues}
      clearFilter={clearFilter}
      driversSource={driversData.rows}
      gotoDetail={(id) => history.push(`/logged/maintenance-detail/${id}`)}
      handleCancelOrder={handleCancelOrder}
      handleChangeTableEvent={handleChangeTableEvent}
      handleEdit={handleEdit}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      handleSelectedMaintenance={handleSelectedMaintenance}
      handleShowFilters={handleShowFilters}
      handleSubmit={handleSubmit}
      loading={loading}
      maintenanceOrdersSource={maintenanceOrdersData}
      maintenanceSelected={maintenanceSelected}
      moreFilters={moreFilters}
      offset={offset}
      operationsSource={operationsData.rows}
      searchValue={searchValue}
      vehiclesSource={vehiclesData.rows}
    />
  )
}

export default withRouter(Manager)
