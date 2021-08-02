import React, { useEffect, useState } from 'react'
import { getById } from '../../../Services/MaintenanceOrders'
import { withRouter } from 'react-router-dom'
import { getAll as getAllDrivers } from '../../../Services/Driver'

import MaintenanceDetail from '../../../Containers/Maintenance/Detail'
import GAInitialize from '../../../utils/ga'

const Detail = ({
  match
}) => {
  const [maintenanceOrder, setMaintenanceOrder] = useState({
    company: {
      name: '',
      document: '',
      street: '',
      streetNumber: '',
      city: '',
      state: '',
      zipcode: '',
      neighborhood: '',
    },
    companyId: null,
    costCenter: null,
    createdAt: null,
    id: null,
    operation: { 
      name: null,
      company: {
        name: '',
        document: '',
        street: '',
        streetNumber: '',
        city: '',
        state: '',
        zipcode: '',
        neighborhood: '',
      }
   },
    maintenanceDate: null,
    maintenanceOrderEvents: [],
    maintenanceOrderDrivers: [{ driver: { name: '', phone: '', driverLicense: '' }}, { driver: { name: '', phone: '', driverLicense: '' }}],
    operationId: null,
    plateCart: null,
    plateHorse: null,
    priority: null,
    service: null,
    serviceDescription: null,
    status: null,
    updatedAt: null,
    userId: null,
    supplies: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  const [driversData, setDriversData] = useState({ rows: [] })

  GAInitialize(`/maintenance-order-detail/${match.params.id}`)

  useEffect(() => {
    getOrder()
    getAllDriver({ limit: 100000 })

  }, [])

  const getAllDriver = async (params = {}) => {
    try {
      const { data } = await getAllDrivers(params)
      setDriversData(data)
    } catch (error) {
      window.onerror(`allDrivers: ${error.error}`, window.location.href)
    }
  }

  const handleSubmitDriver = (value) => console.log(value)
  const handleSubmitUpdateDriver = (value) => console.log(value)

  const getOrder = async() => {
    try {
      const { data } = await getById(match.params.id)
      setMaintenanceOrder(data)
    } catch (error) {
      window.onerror(`orderById: ${error.error}`, window.location.href)
    }
  }

  return (
    <MaintenanceDetail 
      maintenanceOrder={maintenanceOrder}
      driversSource={driversData.rows}
      handleSubmitDriver={handleSubmitDriver}
      handleSubmitUpdateDriver={handleSubmitUpdateDriver}
    />
  )
}

export default withRouter(Detail)
