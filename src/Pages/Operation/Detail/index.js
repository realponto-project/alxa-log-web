import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import GAInitialize from '../../../utils/ga'

import OperationDetail from '../../../Containers/Operation/Detail'
import { getById, getSummary } from '../../../Services/Operations'
import { getMaintenanceOperationId } from '../../../Services/MaintenanceOrders'
import { Form } from 'antd'

const Detail = ({ match, history }) => {
  const [filterForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [operation, setOperation] = useState({})
  const [query, setQuery] = useState({})
  const [chartData, setChartData] = useState([])
  const [offset, setOffset] = useState(1)
  const [datasource, setDatasource] = useState({ rows: [], count: 0 })
  GAInitialize(`/operation/${match.params.id}`)

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

  const getAllMaintenanceOperation = async (query) => {
    setLoading(true)
    try {
      const { data } = await getMaintenanceOperationId(query)
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
  }

  useEffect(() => {
    getOperation()
    summaryChart()
  }, [])

  useEffect(() => {
    getAllMaintenanceOperation({
      ...query,
      operationId: match.params.id,
      offset: offset - 1
    })
  }, [offset, query])

  return (
    <OperationDetail
      operation={operation}
      chartData={chartData}
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
      datasource={datasource}
      gotoDetailOrder={(id) => history.push(`/logged/maintenance/detail/${id}`)}
      filterForm={filterForm}
      loading={loading}
      handleFilter={(values) => {
        setQuery(values)
        setOffset(1)
      }}
      clearFilter={() => {
        setQuery({})
        setOffset(1)
        filterForm.resetFields()
      }}
    />
  )
}

export default withRouter(Detail)
