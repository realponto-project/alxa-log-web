import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import MaintenanceQrcode from './Pages/MaintenanceQrcode'
 
import storage from 'redux-persist/lib/storage'

import Login from './Pages/Login'
import Logged from './Pages/Logged'
import reducers from './Redux/reducers'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/mobile-qrcode-detail/:id" component={MaintenanceQrcode} exact />
          <Route path="/logged" component={Logged} />
          <Redirect from="*" to="/login" />
        </Switch>
      </PersistGate>
    </Provider>
  )
}

export default App
