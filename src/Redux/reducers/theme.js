import { SET_DARK_THEME, SET_LIGHT_THEME } from '../actions/theme'

const initialState = 'light'

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DARK_THEME:
      return 'dark'
    case SET_LIGHT_THEME:
      return 'light'
    default:
      return state
  }
}

export default themeReducer
