import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import { updateMyInfo as updateMyInfoService } from '../../Services/User'
import MyInfoContainer from '../../Containers/MyInfo'
import GAInitialize from '../../utils/ga'

const MyInfo = ({ user, loggedUser }) => {
  const [loading, setLoading] = useState(false)

  const updateMyInfo = async (values) => {
    setLoading(true)
    try {
      const { data } = await updateMyInfoService(user.id, values)
      loggedUser({
        ...user,
        ...data
      })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <MyInfoContainer
      loading={loading}
      user={user}
      updateMyInfo={updateMyInfo}
    />
  )
}
GAInitialize(`/my-info`)

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  loggedUser: (payload) => dispatch({ type: 'USER_LOGGED', payload })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(MyInfo)
