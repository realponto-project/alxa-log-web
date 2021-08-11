import React, { useState } from 'react'
import { message } from 'antd'
import { withRouter } from 'react-router-dom'

import { getByPlate } from '../../../../Services/MaintenanceOrders'
import ManagerContainer from '../../../../Containers/Mobile/MaintenanceManagerMobile'
import GAInitialize from '../../../../utils/ga'
import { createMaintenanceOrderByAuthorizationId } from '../../../../Services/Authorization'

const Manager = ({ history }) => {
  const [searchVehicle, setSearchVehicle] = useState('')
  const [searchButton, setSearchButton] = useState(true)
  const [enableQrCode, setEnableQrCode] = useState(false)
  const [showModalMobile, setShowModalMobile] = useState(false)

  GAInitialize('/maintenance-order-mobile-read-qr-code')

  const authorizationDriver = async (authorizationId) => {
    try {
      const { data } = await createMaintenanceOrderByAuthorizationId({
        authorizationId
      })

      return history.push(`/logged/mobile-maintenance-detail/${data.id}`)
    } catch (error) {
      message.error('Houve um erro!')
      window.onerror(
        `createMaintenanceOrderByAuthorizationId: ${error.error}`,
        window.location.href
      )
    }

    return authorizationDriver(data.id)
  }

  const handleScan = (value) => {
    const data = JSON.parse(value)

    if (data && data.origin === 'solicitation') {
      return history.push(`/logged/mobile-maintenance-detail/${data.id}`)
    }

    if (data && data.origin === 'authorization') {
      return authorizationDriver(data.authorizationId)
    }
  }

  const handleChange = (data) => {
    setSearchVehicle(data.target.value)
    if (data.target.value.length === 0) {
      return setSearchButton(true)
    }
    return setSearchButton(false)
  }

  const handleClick = async () => {
    try {
      const { data } = await getByPlate({
        plate: searchVehicle.toLocaleUpperCase().replace(/[^A-Z0-9]/gi, '')
      })
      if (data) {
        return history.push(`/logged/mobile-maintenance-detail/${data.id}`)
      }

      return message.info(
        'Não foi possível localizar nenhuma ordem de manutenção!'
      )
    } catch (error) {
      window.onerror(`plateById: ${error.error}`, window.location.href)
      message.error('Não foi possível localizar as manutenções!')
    }
  }

  const handleError = (error) => {
    setEnableQrCode(false)
    message.error('Não foi possível ler o qr code!')
    window.onerror(`qrcodeRead: ${error.error}`, window.location.href)
  }

  return (
    <ManagerContainer
      searchVehicle={searchVehicle}
      searchButton={searchButton}
      handleScan={handleScan}
      handleError={handleError}
      handleChange={handleChange}
      handleClick={handleClick}
      enableQrCode={enableQrCode}
      setEnableQrCode={setEnableQrCode}
      showModalMobile={showModalMobile}
      setShowModalMobile={setShowModalMobile}
      setSearchVehicle={setSearchVehicle}
      setSearchButton={setSearchButton}
    />
  )
}

export default withRouter(Manager)
