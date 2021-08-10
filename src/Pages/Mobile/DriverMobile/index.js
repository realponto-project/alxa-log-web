import { isEmpty } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'

import DriverMobileContainer from '../../../Containers/Mobile/DriverMobile'
import { getAllAuthorizations } from '../../../Services/Authorization'
import { getById, updateDriverWithoutAuth } from '../../../Services/Driver'

const DriverMobile = ({ match }) => {
  const [plate, setPlate] = useState(null)
  const [driver, setDriver] = useState(null)
  const [authorizations, setAuthorizations] = useState([])
  const [authorizationId, setAuthorizationId] = useState()
  const history = useHistory()

  useEffect(() => {
    getById(match.params.id)
      .then(({ data }) => setDriver(data))
      .catch((error) => {
        window.onerror(`driverById: ${error.error}`, window.location.href)
      })
  }, [])

  const updatePhone = async (values) => {
    try {
      await updateDriverWithoutAuth(match.params.id, values)
      history.push(`/mobile-driver-success/${match.params.id}`)
    } catch (error) {
      message.error('Não foi possível atualizar o seu telefone!')
      window.onerror(`updateDriver-phone: ${error.error}`, window.location.href)
    }
  }

  const getAuthorization = async (values) => {
    setPlate(values.plate)
    try {
      const { data } = await getAllAuthorizations({
        ...values,
        driverId: match.params.id
      })

      if (isEmpty(data)) {
        message.error('Não foi encontrado autorização para este veículo')
      }

      setAuthorizations(data)
      if (data.length === 1) {
        setAuthorizationId(data[0].id)
      }
    } catch (error) {
      window.onerror(`get-authorization-driver: ${error.error}`, window.location.href)
    }
  }

  const restart = () => {
    setAuthorizations([])
    setAuthorizationId()
    setPlate(null)
  }

  const handleSelecOperation = ({ authorizationId }) =>
    setAuthorizationId(authorizationId)

  return (
    <DriverMobileContainer
      driver={driver}
      updatePhone={updatePhone}
      authorizations={authorizations}
      getAuthorization={getAuthorization}
      authorizationId={authorizationId}
      handleSelecOperation={handleSelecOperation}
      plate={plate}
      restart={restart}
    />
  )
}

export default DriverMobile
