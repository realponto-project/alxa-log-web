import { cnpj } from 'cpf-cnpj-validator'
import { isEmpty } from 'ramda'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsBranch = [{
  label: 'Razão Social',
  name: 'name',
  placeholder: '',
  rules,
  show: true,
  typeInput: 'input'
},
{
  label: 'Cnpj',
  name: 'document',
  rules: [
    {
      required: true,
      validator: async (_, value) => {
        if(isEmpty(value)) {
          return Promise.reject(new Error('Este campo é obrigatório!' ))
        }
        return (
          !cnpj.isValid(value)
          && Promise.reject(new Error('Cnpj inválido!'))
        )
      }
    },
  ],
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},{
  label: 'Cep',
  name: 'zipcode',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},
{
  label: 'Endereço',
  name: 'street',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},
{
  label: 'Número',
  name: 'streetNumber',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},{
  label: 'Bairro',
  name: 'neighborhood',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},{
  label: 'Cidade',
  name: 'city',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},{
  label: 'Estado',
  name: 'state',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},
]

const formSettingsBranchEdit = formSettingsBranch.map(item => ({...item, show: true }))

const settingsNextStep = {
  name: 'document',
  document: 'zipcode',
  zipcode: 'street',
  street: 'streetNumber',
  streetNumber: 'neighborhood',
  neighborhood: 'city',
  city: 'state',
}

export {
  settingsNextStep,
  formSettingsBranch,
  formSettingsBranchEdit
}
