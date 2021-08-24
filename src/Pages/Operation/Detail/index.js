import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  add,
  applySpec,
  filter,
  includes,
  keys,
  length,
  map,
  pathOr,
  pipe,
  prop,
  propOr,
  __
} from 'ramda'
import { Form } from 'antd'
import qs from 'qs'
import moment from 'moment'

import OperationDetail from '../../../Containers/Operation/Detail'
import { getById, getSummary } from '../../../Services/Operations'
import { getMaintenanceOperationId } from '../../../Services/MaintenanceOrders'
import { parseQueryParams } from '../../../utils/queryParams'
import GAInitialize from '../../../utils/ga'

const Detail = ({ match }) => {
  const [filterForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [operation, setOperation] = useState({})
  const [chartData, setChartData] = useState([])
  const [offset, setOffset] = useState(1)
  const [datasource, setDatasource] = useState({ rows: [], count: 0 })
  const [defaultMoreFilters, setDefaultMoreFilters] = useState(false)

  const { search, pathname } = useLocation()
  const history = useHistory()

  GAInitialize(`/operation/${match.params.id}`)

  const changeQueryParams = (search) => {
    return history.replace({
      pathname,
      search
    })
  }

  const getOperation = async () => {
    try {
      const { data } = await getById(match.params.id)
      setOperation(data)
    } catch (error) {
      window.onerror(`operationById: ${error.error}`, window.location.href)
    }
  }

  const summaryChart = async () => {
    try {
      const { data } = await getSummary(match.params.id)
      setChartData(data)
    } catch (error) {
      window.onerror(
        `summaryOperationMaintenance: ${error.error}`,
        window.location.href
      )
    }
  }

  const getAllMaintenanceOperation = async () => {
    setLoading(true)

    const query = parseQueryParams(search)
    try {
      const { data } = await getMaintenanceOperationId({
        ...query,
        operationId: match.params.id
      })
      setDatasource(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(
        `maintenanceOrdersOperationId: ${error.error}`,
        window.location.href
      )
    }
  }

  const handleChangeTableEvent = ({ current }) => {
    setOffset(current)

    const query = { offset: current - 1 }
    const queryParams = parseQueryParams(search)

    changeQueryParams(qs.stringify({ ...queryParams, ...query }))
  }

  useEffect(() => {
    getOperation()
    summaryChart()
    const queryParams = parseQueryParams(search)

    filterForm.setFieldsValue(
      applySpec({
        dates: pipe(
          propOr([], 'dates'),
          map((date) => moment(date))
        ),
        priorities: prop('priorities'),
        services: prop('services'),
        status: prop('status')
      })(queryParams)
    )

    if (
      length(
        filter(
          includes(__, ['status', 'services', 'priorities']),
          keys(queryParams)
        )
      ) > 0
    ) {
      setDefaultMoreFilters(true)
    }
  }, [])

  useEffect(() => {
    const queryParams = parseQueryParams(search)
    const current = pipe(pathOr('0', ['offset']), Number, add(1))(queryParams)

    setOffset(current)

    getAllMaintenanceOperation()
  }, [search])

  const handleFilter = (values) => {
    const queryParams = parseQueryParams(search)

    changeQueryParams(qs.stringify({ ...queryParams, ...values }))
  }

  const clearFilter = () => {
    changeQueryParams('')
    filterForm.resetFields()
  }

  return (
    <OperationDetail
      defaultMoreFilters={defaultMoreFilters}
      operation={operation}
      chartData={chartData}
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
      datasource={datasource}
      gotoDetailOrder={(id) => history.push(`/logged/maintenance/detail/${id}`)}
      filterForm={filterForm}
      loading={loading}
      handleFilter={handleFilter}
      clearFilter={clearFilter}
    />
  )
}

export default Detail
