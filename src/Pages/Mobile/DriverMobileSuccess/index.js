import React from 'react'
import { useHistory } from 'react-router-dom'

import DriverMobileSuccessContainer from '../../../Containers/Mobile/DriverMobileSuccess'

const DriverMobileSuccess = ({ match }) => {
  const history = useHistory()

  const goToDriverPage = () => {
    history.push(`/mobile-driver/${match.params.id}`)
  }

  return <DriverMobileSuccessContainer goToDriverPage={goToDriverPage} />
}

export default DriverMobileSuccess
