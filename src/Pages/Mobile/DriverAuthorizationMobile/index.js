import React from 'react'
import DriverAuthorizationMobileContainer from '../../../Containers/Mobile/DriverAuthorizationMobile'

const DriverAuthorizationMobile = () => {
  const isMobile = !!(window.mobileCheck() || testMobile)

  return <DriverAuthorizationMobileContainer isMobile={isMobile} />
}

export default DriverAuthorizationMobile
