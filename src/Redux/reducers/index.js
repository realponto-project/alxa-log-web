import { combineReducers } from 'redux'

import userReducer from './user'
import companyReducer from './company'
import themeReducer from './theme'

const appReducer =  combineReducers({
  user: userReducer,
  company: companyReducer,
  theme: themeReducer
})


const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = { theme: state.theme }
  }

  return appReducer(state, action)
}

export default rootReducer
