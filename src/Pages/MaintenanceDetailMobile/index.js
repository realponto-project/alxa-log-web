import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { withRouter } from 'react-router-dom'
import { getById, updateEvents } from '../../Services/MaintenanceOrders'
import MaintenanceDetailMobile from '../../Containers/MaintenanceDetailMobile'
import { getAll } from '../../Services/Driver'
import GAInitialize from '../../utils/ga'

const Manager = ({
  history,
  match
}) => {
  const [maintenanceOrder, setMaintenanceOrder] = useState({
    company: {},
    companyId: null,
    costCenter: null,
    createdAt: null,
    id: null,
    maintenanceDate: null,
    maintenanceOrderEvents: [],
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
    maintenanceOrderDrivers: [
      { driver: { name: '', phone: '', driverLicense: ''}},
      { driver: { name: '', phone: '', driverLicense: ''}}
  ],
  })

  const [driversSource, setDriversSource] = useState([])
  const [showModal, setShowModal] = useState(false)
  GAInitialize(`/maintenance-order-detail/${match.params.id}`)
  useEffect(() => {
    getOrder()
    getAllDriver()
  }, [])

  const getAllDriver = async () => {
    try {
      const { data } = await getAll({ limit: 100000 })
      setDriversSource(data)
    } catch (error) {
      window.onerror(`allDrivers: ${error.error}`, window.location.href)
    }
  }

  const handleSubmit = async (values) => {
    try {
      if (values.status === 'supply' && !maintenanceOrder.plateHorse) {
        throw new Error('Not allow add supply to plateCart!')
      }

      const { data } = await updateEvents(match.params.id, values)
      setMaintenanceOrder(data)
      message.success('Eventos atualizado com sucesso!');
      setShowModal(false)
    } catch (error) {
      window.onerror(`createEvent: ${error.error}`, window.location.href)
      setShowModal(false)
    }
  }

  const getOrder = async() => {
    try {
      const { data } = await getById(match.params.id)
      setMaintenanceOrder(data)
    } catch (error) {
      window.onerror(`orderById: ${error.error}`, window.location.href)
    }
  }

  const goBack = () => history.push('/logged/mobile-maintenance')

  return (
    <MaintenanceDetailMobile 
      goBack={goBack}
      handleSubmit={handleSubmit}
      maintenanceOrder={maintenanceOrder}
      driversSource={driversSource.rows}
      showModal={showModal}
      setShowModal={setShowModal}
    />
  )
}

export default withRouter(Manager)
