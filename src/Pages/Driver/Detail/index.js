import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import GAInitialize from '../../../utils/ga'

import DriverDetail from '../../../Containers/Driver/Detail'
import {
  getById,
  createDriverIncident,
  getIncidentsSummary,
  getAllIncidentsByDriverId
} from '../../../Services/Driver'
import {
  createAuthorization,
  updateAuthorization,
  getAll as getAllAuthorizations
} from '../../../Services/Authorization'
import { getAll } from '../../../Services/Vehicle'
import { getAll as getAllOperations } from '../../../Services/Operations'
import { map, omit, pathOr, pipe, prop } from 'ramda'

const Detail = ({ match, history }) => {
  const [authorizations, setAuthorizations] = useState({ rows: [] })
  const [authorizationLoading, setAuthorizationLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  const [driver, setDriver] = useState({
    companyId: null,
    createdAt: null,
    driverLicense: null,
    id: null,
    name: null,
    phone: null,
    updatedAt: null,
    userId: null,
    driverIncidents: []
  })
  const [incidents, setIncidents] = useState({ rows: [] })
  const [incidentsLoading, setIncidentsLoading] = useState(false)
  const [operationsData, setOperationsData] = useState({ rows: [] })
  const [queryAuthorization, setQueryAuthorization] = useState({
    offset: 0,
    limit: 10
  })
  const [queryIncident, setQueryIncident] = useState({
    offset: 0,
    limit: 10
  })
  const [vehiclesData, setVehiclesData] = useState({ rows: [] })

  const clearFilterAuthorization = () => {
    setQueryAuthorization({
      offset: 0,
      limit: 10
    })
  }

  const clearFilterIncident = () => {
    setQueryIncident({
      offset: 0,
      limit: 10
    })
  }

  const errorMessage = (text) => {
    message.error(text)
  }

  const getAllAuthorization = async () => {
    setAuthorizationLoading(true)
    try {
      const { data } = await getAllAuthorizations({
        ...queryAuthorization,
        driverId: match.params.id
      })
      setAuthorizations({ ...data, current: queryAuthorization.offset + 1 })
      setAuthorizationLoading(false)
    } catch (error) {
      setAuthorizationLoading(false)
      window.onerror(`getAuthorizations: ${error.error}`, window.location.href)
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

  const getDriver = async () => {
    try {
      const { data } = await getById(match.params.id)
      setDriver(data)
      console.log('aquiiiiiiiiii', data)
    } catch (error) {
      window.onerror(`driverId: ${error.error}`, window.location.href)
    }
  }

  const getIncidents = async () => {
    setIncidentsLoading(true)
    try {
      const { data } = await getAllIncidentsByDriverId(
        match.params.id,
        queryIncident
      )

      setIncidents({ ...data, current: queryIncident.offset + 1 })
      setIncidentsLoading(false)
    } catch (error) {
      setIncidentsLoading(false)
      window.onerror(
        `getAllIncidentsByDriverId: ${error.error}`,
        window.location.href
      )
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

  const goToApp = () => {
    history.push('/logged/mobile-authorization')
  }

  const handleChangeTableAuthorization = ({ current }) => {
    setQueryAuthorization({ ...queryAuthorization, offset: current - 1 })
  }

  const handleChangeTableIncident = ({ current }) => {
    setQueryIncident({ ...queryIncident, offset: current - 1 })
  }

  const handleFilterAuthorization = (values) => {
    setQueryAuthorization({ ...queryAuthorization, ...values, offset: 0 })
  }

  const handleFilterIncident = (values) => {
    const query = omit(['dates'], values)
    query.dates = pipe(pathOr([], ['dates']), map(prop('_d')))(values)

    setQueryIncident({ ...queryIncident, ...query, offset: 0 })
  }

  const handleSubmit = async (values) => {
    try {
      await createDriverIncident({
        ...values,
        incidentDate: new Date(values.incidentDate),
        driverId: match.params.id
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
        driverId: match.params.id
      })
      getDriver()
      success('Autorização criada com sucesso!')
    } catch (error) {
      window.onerror(
        `createAuthorization: ${error.error}`,
        window.location.href
      )
      errorMessage('Não foi possível criar a autorização!')
    }
  }

  const handleSubmitUpdateAuthorization = async ({
    id,
    activated,
    driverId,
    operationId,
    vehicleId
  }) => {
    try {
      await updateAuthorization({
        id,
        activated,
        driverId,
        operationId,
        vehicleId
      })
      getAllAuthorization()
    } catch (err) {
      console.error(err)
    }
  }

  const success = (text) => {
    message.success(text)
  }

  const summaryChartIncidents = async () => {
    try {
      const { data } = await getIncidentsSummary(match.params.id)
      setChartData(data)
    } catch (error) {
      window.onerror(`summaryIncident: ${error.error}`, window.location.href)
    }
  }

  GAInitialize(`/driver/${match.params.id}`)

  useEffect(() => {
    getDriver()
    getVehicles({ limit: 100000 })
    getAllOperation({ limit: 100000 })
    summaryChartIncidents()
  }, [])

  useEffect(() => {
    getAllAuthorization()
  }, [queryAuthorization])

  useEffect(() => {
    getIncidents()
  }, [queryIncident])

  return (
    <DriverDetail
      authorizations={authorizations}
      authorizationLoading={authorizationLoading}
      chartData={chartData}
      clearFilterAuthorization={clearFilterAuthorization}
      clearFilterIncident={clearFilterIncident}
      driver={driver}
      goToApp={goToApp}
      handleChangeTableAuthorization={handleChangeTableAuthorization}
      handleChangeTableIncident={handleChangeTableIncident}
      handleFilterAuthorization={handleFilterAuthorization}
      handleFilterIncident={handleFilterIncident}
      handleSubmit={handleSubmit}
      handleSubmitAuthorization={handleSubmitAuthorization}
      handleSubmitUpdateAuthorization={handleSubmitUpdateAuthorization}
      incidents={incidents}
      incidentsLoading={incidentsLoading}
      operationsSource={operationsData.rows}
      vehiclesSource={vehiclesData.rows}
    />
  )
}

export default withRouter(Detail)
