import React from 'react'
import ReactDOM from 'react-dom'
import ptBR from 'antd/lib/locale/pt_BR'
import { ConfigProvider, Empty, Image } from 'antd'
import { HashRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import ReactGA from 'react-ga'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import NoData from './Assets/noData.svg'

ReactGA.initialize('G-YRPHP5Q009')

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ConfigProvider
        locale={ptBR}
        renderEmpty={() => (
          <Empty
            description="Não há dados"
            image={<Image width={85} src={NoData} preview={false} />}
          />
        )}>
        <App />
      </ConfigProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
reportWebVitals()
