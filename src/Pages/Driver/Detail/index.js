import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import GAInitialize from '../../../utils/ga'

import DriverDetail from '../../../Containers/Driver/Detail'
import { getById, createDriverIncident, getIncidentsSummary } from '../../../Services/Driver'
import { getAll } from '../../../Services/Vehicle'
import { getAll as getAllOperations } from '../../../Services/Operations'

const Detail = ({
  match
}) => {
  const [driver, setDriver] = useState({
    companyId: null,
    createdAt: null,
    driverLicense: null,
    id: null,
    name: null,
    phone: null,
    updatedAt: null,
    userId: null,
    driverIncidents: [],
  })

  const [vehiclesData, setVehiclesData] = useState({ rows: [] })
  const [operationsData, setOperationsData] = useState({ rows: [] })
  const [chartData, setChartData] = useState([])
  GAInitialize(`/driver/${match.params.id}`)

  useEffect(() => {
    getDriver()
    getVehicles({ limit: 100000 })
    getAllOperation({ limit: 100000 })
    summaryChartIncidents()
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getDriver = async() => {
    try {
      const { data } = await getById(match.params.id)
      setDriver(data)
    } catch (error) {
      window.onerror(`driverId: ${error.error}`, window.location.href)
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
    try {
      const { data } = await getAll(params)
      setVehiclesData(data)
    } catch (error) {
      window.onerror(`allVehicleUser: ${error.error}`, window.location.href)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createDriverIncident({
        ...values,
        incidentDate: new Date(values.incidentDate),
        driverId: match.params.id,
      })
      getDriver()
      summaryChartIncidents()
      success('Incidente criado com sucesso!')
    } catch (error) {
      window.onerror(`createIncident: ${error.error}`, window.location.href)
      errorMessage('Não foi criar o incidente!')
    }
  }

  const summaryChartIncidents = async () => {
    try {
      const { data } = await getIncidentsSummary(match.params.id)
      setChartData(data)
    } catch (error) {
      window.onerror(`summaryIncident: ${error.error}`, window.location.href)
    }
  }

  return (
    <DriverDetail
      driver={driver}
      vehiclesSource={vehiclesData.rows}
      operationsSource={operationsData.rows}
      handleSubmit={handleSubmit}
      chartData={chartData}
    />
  )
}

export default withRouter(Detail)
