import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import LoginContainer from '../../Containers/Login'
import Auth from '../../Services/Auth'
import { getCompanyById } from '../../Services/Company'
import testMobile from '../../utils/isMobile'
import GAInitialize from '../../utils/ga'

const isMobile = window.mobileCheck() || testMobile ? true : false

const Login = ({
  history,
  loggedUser,
  setCompany,
}) => {
  const [isVisibleMessageError, setIsVisibleMessageError] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const authentication = (values) => {
    let redirectPage = '/logged/dashboard'
    setLoading(true)
    Auth({...values, document: values.document.trim().replace(/\D/g, '') })
      .then(({ data }) => {
        loggedUser(data)
        if (data.firstAccess) {
          redirectPage = '/user/onboarding'
        }

        if(isMobile) {
          redirectPage = '/logged/mobile-maintenance'
        }

        GAInitialize(`/login/${data.user.name}`)

        localStorage.setItem('token', data.token)
        localStorage.setItem('user.name', data.user.name)
        return data
      })
      .then((data) => {
        return getCompanyById(data.user.companyId)
      })
      .then(({ data }) => setCompany(data))
      .then(() => history.push(redirectPage))
      .catch((err) => {
        setLoading(false)
        setIsVisibleMessageError(!!err.response)
        window.onerror(`loggin: ${err}`, window.location.href)
      })
  }

  return (
    <LoginContainer
      authentication={authentication}
      isVisibleMessageError={isVisibleMessageError}
      loading={loading}
      isMobile={isMobile}
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  loggedUser: (payload) => dispatch({ type: 'USER_LOGGED', payload }),
  setCompany: (payload) => dispatch({ type: 'SET_COMPANY', payload }),
})

const enhanced = compose(connect(null, mapDispatchToProps), withRouter)

export default enhanced(Login)
