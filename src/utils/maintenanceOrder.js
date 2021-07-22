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
  'solicitation': '#5DA0FC',
  'check-in': '#268E86',
  'avaiable': '#F29F03',
  'parking': '#1772C9',
  'courtyard': '#EA5656',
  'awaiting_repair': '#7550D8',
  'dock': '#2D2D2D',
  'wash': '#D588F2',
  'supply': '#17C9B2',
  'check-out': '#264ABE',
}

const parseStatus = {
  'solicitation': 'Solicitação',
  'check-in': 'Entrada',
  'avaiable': 'Liberado',
  'parking': 'Estacionar',
  'courtyard': 'Pátio',
  'awaiting_repair': 'Aguardando peça',
  'dock': 'Doca',
  'wash': 'Lavar',
  'supply': 'Abastecer',
  'check-out': 'Saída',
}

export {
  parseStatus,
  parseStatusColor,
  services,
  status
}