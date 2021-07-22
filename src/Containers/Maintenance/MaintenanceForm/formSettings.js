import { cnpj } from 'cpf-cnpj-validator'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsVehicle = vehiclesSource => [{
  label: 'Placa do Cavalo',
  name: 'plateHorse',
  placeholder: '',
  show: true,
  rules,
  typeInput: 'select',
  options: vehiclesSource.map(item => ({ value: item.plate, label: item.plate }))
},
{
  label: 'Placa do veículo da manutenção',
  name: 'plateCart',
  placeholder: '',
  show: false,
  rules,
  typeInput: 'select',
  options: vehiclesSource.map(item => ({ value: item.plate, label: item.plate }))
},
{
  label: 'Motorista',
  name: 'driverId',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: []
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
  label: 'Centro de custo',
  name: 'costCenter',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},
{
  label: 'Data da manutenção',
  name: 'maintenanceDate',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'date',
  options: [],
  format: "DD/MM/YYYY"
},
{
  label: 'Filial',
  name: 'companyId',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: []
},
{
  label: 'Criticidade',
  name: 'priority',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: [{ value: 'low', label: 'Baixa' }, { value: 'medium', label: 'Média' }, { value: 'high',  label: 'Alta' }]
},
{
  label: 'Tipo de Serviço',
  name: 'service',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: [{ value: 'corrective', label: 'Corretiva' }, { value: 'preventive', label: 'Preventiva' }]
},
{
  label: 'Descrição do serviço',
  name: 'serviceDescription',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'textArea',
  options: []
},
]

const parseOptionItem = ({ id, name }) => ({ value: id, label: name })
const parseOptionItemDriver = item => ({ value: item.id, label: `${item.name} - CNH: ${item.driverLicense}` })
const parseOptionItemOperation = item => ({ value: item.id, label: `${item.name} - Filial: ${item.company.name} / ${cnpj.format(item.company.document)}` })

const formSettingsVehicleEdit = (
  branchsSource, 
  driversSource,
  vehiclesSource,
  operationsSource
) => formSettingsVehicle(vehiclesSource).map(item => {
  if (item.name === `operationId`) {
    return ({ ...item, show: true, options: operationsSource.map(parseOptionItemOperation) })
  }

  if (item.name === `companyId`) {
    return ({ ...item, show: true, options: branchsSource.map(parseOptionItem) })
  }

  if (item.name === `driverId`) {
    return ({ ...item, show: true, options: driversSource.map(parseOptionItemDriver) })
  }
  
  return ({...item, show: true })
})

const settingsNextStep = {
  plateHorse: 'plateCart',
  plateCart: 'driverId',
  driverId: 'operationId',
  operationId: 'costCenter',
  costCenter: 'maintenanceDate',
  maintenanceDate: 'companyId',
  companyId: 'priority',
  priority: 'service',
  service: 'serviceDescription',
}

export {
  settingsNextStep,
  formSettingsVehicle,
  formSettingsVehicleEdit
}
