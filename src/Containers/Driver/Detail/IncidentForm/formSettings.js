import { cnpj } from 'cpf-cnpj-validator'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsIncident = vehiclesSource => [{
  label: 'Placa do veículo',
  name: 'vehicleId',
  placeholder: '',
  show: true,
  rules,
  typeInput: 'select',
  options: vehiclesSource.map(item => ({ value: item.id, label: item.plate }))
},
{
  label: 'Operação',
  name: 'operationId',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: []
},
{
  label: 'Data do incident',
  name: 'incidentDate',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'date',
  options: [],
  format: "DD/MM/YYYY"
},
{
  label: 'Tipo de incidente',
  name: 'incidentType',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: [{ value: 'accident', label: 'Acidente' }, { value: 'collision', label: 'Colisão' }, { value: 'vehicle_break_down', label: 'Veículo quebrado' }]
},
{
  label: 'Descrição do incidente',
  name: 'incidentDescription',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'textArea',
  options: []
},
]

const parseOptionItemOperation = item => ({ value: item.id, label: `${item.name} - Filial: ${item.company.name} / ${cnpj.format(item.company.document)}` })

const formSettingsIncidentEdit = (
  vehiclesSource,
  operationsSource
) => formSettingsIncident(vehiclesSource).map(item => {
  if (item.name === `operationId`) {
    return ({ ...item, show: true, options: operationsSource.map(parseOptionItemOperation) })
  }

  return ({...item, show: true })
})

const settingsNextStep = {
  vehicleId: 'operationId',
  operationId: 'incidentDate',
  incidentDate: 'incidentType',
  incidentType: 'incidentDescription',
}

export {
  settingsNextStep,
  formSettingsIncident,
  formSettingsIncidentEdit
}
