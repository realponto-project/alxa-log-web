import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import GAInitialize from '../../../utils/ga'

import OperationDetail from '../../../Containers/Operation/Detail'
import { getById, getSummary } from '../../../Services/Operations'
import { getMaintenanceOperationId } from '../../../Services/MaintenanceOrders'

const Detail = ({
  match,
  history,
}) => {
  const [operation, setOperation] = useState({})
  const [chartData, setChartData] = useState([])
  const [offset, setoffset] = useState(1)
  const [datasource, setDatasource] = useState({ rows: [], count: 0 })

  
  GAInitialize(`/operation/${match.params.id}`)

  useEffect(() => {
    getOperation()
    summaryChart()
    getAllMaintenanceOperation({ operationId: match.params.id })
  }, [])

  const getOperation = async() => {
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
      window.onerror(`summaryOperationMaintenance: ${error.error}`, window.location.href)
    }
  }

  const getAllMaintenanceOperation = async (query) => {
    try {
      const { data } = await getMaintenanceOperationId(query)
      setDatasource(data)
    } catch (error) {
      window.onerror(`maintenanceOrdersOperationId: ${error.error}`, window.location.href)
    }
  } 

  const handleChangeTableEvent = ({ current }) => {
    setoffset(current)
    const query = { offset: (current - 1), operationId: match.params.id }
    getAllMaintenanceOperation(query)
  }

  return (
    <OperationDetail
      operation={operation}
      chartData={chartData}
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
      datasource={datasource}
      gotoDetailOrder={id => history.push(`/logged/maintenance-detail/${id}`)}
    />
  )
}

export default withRouter(Detail)
