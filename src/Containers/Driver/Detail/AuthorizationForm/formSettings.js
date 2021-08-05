import { cnpj } from 'cpf-cnpj-validator'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsAuthorization = vehiclesSource => [{
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
}
]

const parseOptionItemOperation = item => ({ value: item.id, label: `${item.name} - Filial: ${item.company.name} / ${cnpj.format(item.company.document)}` })

const formSettingsAuthorizationEdit = (
  vehiclesSource,
  operationsSource
) => formSettingsAuthorization(vehiclesSource).map(item => {
  if (item.name === `operationId`) {
    return ({ ...item, show: true, options: operationsSource.map(parseOptionItemOperation) })
  }

  return ({...item, show: true })
})

const settingsNextStep = {
  vehicleId: 'operationId',
  operationId: 'incidentDate',
}

export {
  settingsNextStep,
  formSettingsAuthorization,
  formSettingsAuthorizationEdit
}
