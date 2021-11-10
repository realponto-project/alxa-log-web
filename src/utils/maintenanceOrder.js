const status = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
}

const services = {
  corrective: 'Corretiva',
  preventive: 'Preventiva'
}

const parseStatusColor = {
  'cancel': '#EA5656',
  'solicitation': '#5DA0FC',
  'check-in': '#268E86',
  'avaiable': '#F29F03',
  'parking': '#1772C9',
  'courtyard': '#EA5656',
  'awaiting_repair': '#7550D8',
  'dock': '#FF9C70',
  'wash': '#D588F2',
  'supply': '#17C9B2',
  'check-out': '#264ABE',
  'external_service': '#F6C21F',
  'service_external': "#F6C21F",
  'awaiting_budget': "#D500F2",
}

const parseStatus = {
  'cancel': 'Cancelado',
  'solicitation': 'Solicitação',
  'check-in': 'Entrada',
  'avaiable': 'Aguardando Retirada',
  'parking': 'Estacionar',
  'courtyard': 'Pátio',
  'awaiting_repair': 'Aguardando peça',
  'dock': 'Doca',
  'wash': 'Lavar',
  'supply': 'Abastecer',
  'check-out': 'Saída',
  'external_service': 'Serviços externos',
  'service_external': 'Serviços externos',
  'awaiting_budget': 'Aguardando orçamento',
}

export {
  parseStatus,
  parseStatusColor,
  services,
  status
}
