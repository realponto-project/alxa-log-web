import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import DriverMobileContainer from '../../../Containers/Mobile/DriverMobile'
import { getById, updateDriver } from '../../../Services/Driver'

const DriverMobile = ({ match }) => {
  const [driver, setDriver] = useState(null)
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
      await updateDriver({ ...values, id: match.params.id })
      history.push(`/logged/mobile-driver-success/${match.params.id}`)
    } catch (error) {
      window.onerror(`updateDriver-phone: ${error.error}`, window.location.href)
    }
  }

  return <DriverMobileContainer driver={driver} updatePhone={updatePhone} />
}

export default DriverMobile
