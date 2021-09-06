import { cpf } from 'cpf-cnpj-validator'
import { isEmpty } from 'ramda'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsDriver = [{
  label: 'Nome completo',
  name: 'name',
  placeholder: '',
  rules,
  show: true,
  typeInput: 'input'
},
{
  label: 'CNH',
  name: 'driverLicense',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},
  {
    label: 'Validade CNH',
    name: 'expireDriverLicense',
    rules,
    placeholder: '',
    show: false,
    typeInput: 'datepicker',
    format: "DD/MM/YYYY",
    disabled: true,
    options: []
  },
   {
    label: 'RG',
    name: 'rg',
    rules,
    placeholder: '',
    show: false,
    typeInput: 'input',
    options: []
  },
   {
    label: 'CPF',
    name: 'cpf',
    rules: [
      {
        required: true,
        validator: async (_, value) => {
          if(isEmpty(value)) {
            return Promise.reject(new Error('Este campo é obrigatório!' ))
          }
          return (
            !cpf.isValid(value)
            && Promise.reject(new Error('CPF inválido!'))
          )
        }
      },
    ],
    placeholder: '',
    show: false,
    typeInput: 'input',
    options: []
  },
   {
    label: 'Validade ASO',
    name: 'expireASO',
    rules,
    placeholder: '',
    show: false,
    typeInput: 'datepicker',
    format: "DD/MM/YYYY",
    disabled: true,
    options: []
  },
   {
    label: 'Protocolo seguradora',
    name: 'protocolInsuranceCompany',
    rules,
    placeholder: '',
    show: false,
    typeInput: 'input',
    options: []
  },
   {
    label: 'Validade protocolo seguradora',
    name: 'expireProtocolInsuranceCompany',
    rules,
    placeholder: '',
    show: false,
    typeInput: 'datepicker',
    format: "DD/MM/YYYY",
    disabled: true,
    options: []
  },
   {
    label: 'Curso MOP',
    name: 'mop',
    rules,
    placeholder: '',
    show: false,
    typeInput: 'radio',
    options: [
      { value: true, label: 'Sim' },
      { value: false, label: 'Não' }
    ],
  },{
    label: 'Vínculo',
    name: 'bond',
    rules,
    placeholder: '',
    show: false,
    typeInput: 'select',
    options: [
      { value: 'AGREGADO', label: 'Agregado' },
      { value: 'FROTA', label: 'Frota' },
      { value: 'TERCEIRO', label: 'Terceiro' },
      { value: 'TERCEIRO FIDELIZADO', label: 'Terceiro fidelizado' }
    ],
  },
   {
    label: 'Telefone',
    name: 'phone',
    rules,
    placeholder: '',
    show: false,
    typeInput: 'input',
    options: []
  },
]

const formSettingsDriverEdit = formSettingsDriver.map(item => ({ ...item, show: true }))

const settingsNextStep = {
  name: 'driverLicense',
  driverLicense: 'expireDriverLicense',
  expireDriverLicense: 'rg',
  rg: 'cpf',
  cpf: 'expireASO',
  expireASO: 'protocolInsuranceCompany',
  protocolInsuranceCompany: 'expireProtocolInsuranceCompany',
  expireProtocolInsuranceCompany: 'mop',
  mop: 'bond',
  bond: 'phone',
}

export {
  settingsNextStep,
  formSettingsDriver,
  formSettingsDriverEdit
}
