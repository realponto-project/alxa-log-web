const orderStatus = [
  // status de saida
  { value: 'sale', label: 'Venda' },
  { value: 'ecommerce', label: 'Ecommerce' },
  { value: 'free_market', label: 'Mercado Livre' },
  { value: 'technician', label: 'Técnico' },
  { value: 'outputs', label: 'Saída' },
  { value: 'booking', label: 'Reserva' },
  { value: 'tenancy', label: 'Locação' },
  { value: 'borrowing', label: 'Empréstimo' },
  { value: 'in_analysis', label: 'Em Análise' },
  { value: 'repair', label: 'Conserto' },
  // status de entrada
  { value: 'buy', label: 'Compra' },
  { value: 'inputs', label: 'Entrada' },
  { value: 'exchange', label: 'Troca' },
  { value: 'analysis_return', label: 'Retorno Análise' },
  { value: 'repair_return', label: 'Retorno Conserto' },
  { value: 'booking_return', label: 'Restorno Reserva' },
  {
    value: 'borrowing_with_pending_analysis_return',
    label: 'Retorno Empréstimo e Aguardando Análise'
  },
  {
    value: 'tenancy_with_pending_analysis_return',
    label: 'Retorno Locação e Aguardando Análise'
  },
  { value: 'technician_return', label: 'Retorno Técnico' },
  {
    value: 'technician_with_pending_analysis_return',
    label: 'Retorno Técnico e Aguardando Análise'
  },
  {
    value: 'ecommerce_with_pending_analysis_return',
    label: 'Retorno Ecommerce e Aguardando Análise'
  },
  { value: 'free_market_return', label: 'Retorno Mercado Livre' },
  {
    value: 'free_market_with_analysis_return',
    label: 'Retorno Mercado Livre e Aguardando Análise'
  }
]

const translateStatus = {
  // status de saida
  sale: 'Venda',
  ecommerce: 'Ecommerce',
  free_market: 'Mercado Livre',
  technician: 'Técnico',
  outputs: 'Saída',
  booking: 'Reserva',
  tenancy: 'Locação',
  borrowing: 'Empréstimo',
  in_analysis: 'Em Análise',
  repair: 'Conserto',
  // status de entrada
  buy: 'Compra',
  inputs: 'Entrada',
  exchange: 'Troca',
  analysis_return: 'Retorno Análise',
  repair_return: 'Retorno Conserto',
  booking_return: 'Restorno Reserva',
  pending_analysis: 'Aguardando análise',
  borrowing_with_pending_analysis_return:
    'Retorno Empréstimo e Aguardando Análise',
  tenancy_with_pending_analysis_return: 'Retorno Locação e Aguardando Análise',
  technician_return: 'Retorno Técnico',
  technician_with_pending_analysis_return:
    'Retorno Técnico e Aguardando Análise',
  ecommerce_with_pending_analysis_return:
    'Retorno Ecommerce e Aguardando Análise',
  free_market_return: 'Retorno Mercado Livre',
  free_market_with_analysis_return: 'Retorno Mercado Livre e Aguardando Análise'
}

const statusColors = {
  // status de saida
  sale: '#5DA0FC',
  ecommerce: '#268E86',
  free_market: '#F29F03',
  technician: '#1772C9',
  outputs: '#EA5656',
  booking: '#7550D8',
  tenancy: '#2D2D2D',
  borrowing: '#F29F03',
  in_analysis: '#D588F2',
  repair: '#F2CB03',
  // status de entrada
  buy: '#17C9B2',
  inputs: '#7250D8',
  exchange: '#5D3F90',
  analysis_return: '#984141',
  repair_return: '#264ABE',
  // temos que mexer nas cores daqui pra baixo que nao ficou bomhaha
  booking_return: '#F50',
  borrowing_with_pending_analysis_return: '#2db7f5',
  tenancy_with_pending_analysis_return: '#87d068',
  technician_return: '#108ee9',
  technician_with_pending_analysis_return: '#0052cc',
  ecommerce_with_pending_analysis_return: '#A5D0A5',
  free_market_return: '#171383',
  free_market_with_analysis_return: '#5666C8'
}

// const parseStatusToTypeLable = {
//   sale: 'Saída',
//   ecommerce: 'Saída',
//   free_market: 'Saída',
//   technician: 'Saída',
//   outputs: 'Saída',
//   booking: 'Saída',
//   tenancy: 'Saída',
//   borrowing: 'Saída',
//   in_analysis: 'Saída',
//   repair: 'Saída',
//   buy: 'Entrada',
//   inputs: 'Entrada',
//   exchange: 'Entrada',
//   pending_analysis: 'Entrada',
//   analysis_return: 'Entrada',
//   repair_return: 'Entrada',
//   booking_return: 'Entrada',
//   borrowing_with_pending_analysis_return: 'Entrada',
//   tenancy_with_pending_analysis_return: 'Entrada',
//   technician_return: 'Entrada',
//   technician_with_pending_analysis_return: 'Entrada',
//   ecommerce_with_pending_analysis_return: 'Entrada',
//   free_market_return: 'Entrada',
//   free_market_with_analysis_return: 'Entrada'
// }

// const ENUM_TRANSACTION = [
//   'sale',
//   'ecommerce',
//   'free_market',
//   'technician',
//   'outputs',
//   'booking',
//   'tenancy',
//   'borrowing',
//   'in_analysis',
//   'repair',
//   'buy',
//   'inputs',
//   'exchange',
//   'pending_analysis',
//   'analysis_return',
//   'repair_return',
//   'booking_return',
//   'borrowing_with_pending_analysis_return',
//   'tenancy_with_pending_analysis_return',
//   'technician_return',
//   'technician_with_pending_analysis_return',
//   'ecommerce_with_pending_analysis_return',
//   'free_market_return',
//   'free_market_with_analysis_return'
// ]

const parseStatusToType = {
  sale: 'outputs',
  ecommerce: 'outputs',
  free_market: 'outputs',
  technician: 'outputs',
  outputs: 'outputs',
  booking: 'outputs',
  tenancy: 'outputs',
  borrowing: 'outputs',
  in_analysis: 'outputs',
  repair: 'outputs',
  buy: 'inputs',
  inputs: 'inputs',
  exchange: 'inputs',
  pending_analysis: 'inputs',
  analysis_return: 'inputs',
  repair_return: 'inputs',
  booking_return: 'inputs',
  borrowing_with_pending_analysis_return: 'inputs',
  tenancy_with_pending_analysis_return: 'inputs',
  technician_return: 'inputs',
  technician_with_pending_analysis_return: 'inputs',
  ecommerce_with_pending_analysis_return: 'inputs',
  free_market_return: 'inputs',
  free_market_with_analysis_return: 'inputs'
}

export { translateStatus, statusColors, orderStatus, parseStatusToType }
