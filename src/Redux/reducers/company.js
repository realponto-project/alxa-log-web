import { SET_COMPANY, UNSET_COMPANY } from '../actions/company'

const initialState = {}

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY:
      return action.payload
    case UNSET_COMPANY:
      return initialState
    default:
      return state
  }
}

export default companyReducer
