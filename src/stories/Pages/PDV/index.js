import React from 'react'

import PDVContainer from '../../../Containers/PDV'

export default {
  title: 'Pages',
  component: PDVContainer
}

const list = [
  {
    productName: 'Relógio Control ID',
    barCode: '098943289742',
    amount: 2,
    price: '894.99'
  },
  {
    productName: 'Relógio Control ID',
    barCode: '098943289742',
    amount: 2,
    price: '894.99'
  },
  {
    productName: 'Relógio Control ID',
    barCode: '098943289742',
    amount: 2,
    price: '894.99'
  },
  {
    productName: 'Relógio Control ID',
    barCode: '098943289742',
    amount: 2,
    price: '894.99'
  },
  {
    productName: 'Relógio Control ID',
    barCode: '098943289742',
    amount: 2,
    price: '894.99'
  },
  {
    productName: 'Relógio Control ID',
    barCode: '098943289742',
    amount: 2,
    price: '894.99'
  },
  {
    productName: 'Relógio Control ID',
    barCode: '098943289742',
    amount: 2,
    price: '894.99'
  },

  {
    productName: 'Henry plus',
    barCode: '098943289742',
    amount: 2,
    price: '1500.99'
  }
]

const Template = (args) => {
  return <PDVContainer {...args} />
}

export const PDV = Template.bind({})

PDV.args = {
  list
}
