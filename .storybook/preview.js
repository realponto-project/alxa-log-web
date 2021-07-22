import React from 'react'
import 'moment/locale/pt-br'
import fake from 'faker'
import ptBR from 'antd/lib/locale/pt_BR'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'

fake.locale = 'pt_PT'

export const decorators = [
  (Story) => (
    <ConfigProvider locale={ptBR}>
      <Story />
    </ConfigProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
