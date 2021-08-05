import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import GAInitialize from '../../../utils/ga'

import DriverDetail from '../../../Containers/Driver/Detail'
import { getById, createDriverIncident, getIncidentsSummary } from '../../../Services/Driver'
import { createAuthorization, updateAuthorization } from '../../../Services/Authorization'
import { getAll } from '../../../Services/Vehicle'
import { getAll as getAllOperations } from '../../../Services/Operations'

const Detail = ({
  match, history
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
      console.log('aquiiiiiiiiii',data)
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
      errorMessage('Não foi possível criar incidente!')
    }
  }

  const handleSubmitAuthorization = async (values) => {
    try {
      await createAuthorization({
        ...values,
        driverId: match.params.id,
      })
      getDriver()
      success('Autorização criada com sucesso!')
    } catch (error) {
      window.onerror(`createAuthorization: ${error.error}`, window.location.href)
      errorMessage('Não foi possível criar a autorização!')
    }
  }

  const handleSubmitUpdateAuthorization = async ({id, activated, driverId, operationId, vehicleId}) => {
    try{
      console.log({id, activated, driverId, operationId, vehicleId})
      await updateAuthorization({id, activated, driverId, operationId, vehicleId}) 
    }catch(err){
      console.error(err)
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

  const goToApp = () => {
    history.push('/logged/mobile-authorization')
  }

  return (
    <DriverDetail
      driver={driver}
      vehiclesSource={vehiclesData.rows}
      operationsSource={operationsData.rows}
      handleSubmit={handleSubmit}
      chartData={chartData}
      goToApp={goToApp}
      handleSubmitAuthorization={handleSubmitAuthorization}
      handleSubmitUpdateAuthorization={handleSubmitUpdateAuthorization}
    />
  )
}

export default withRouter(Detail)
