import { cpf } from 'cpf-cnpj-validator'
import { isEmpty, map } from 'ramda'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsMyTeam = ({ companies }) => [
  {
    label: 'Nome',
    name: 'name',
    placeholder: '',
    rules,
    show: true,
    typeInput: 'input'
  },
  {
    label: 'CPF',
    name: 'document',
    rules: [
      {
        required: true,
        validator: async (_, value) => {
          if (isEmpty(value)) {
            return Promise.reject(new Error('Este campo é obrigatório!'))
          }
          return (
            !cpf.isValid(value) && Promise.reject(new Error('CPF inválido!'))
          )
        }
      }
    ],
    placeholder: '',
    show: false,
    typeInput: 'input',
    options: []
  },
  {
    label: 'Empresa',
    name: 'companyId',
    rules,
    placeholder: '',
    show: false,
    typeInput: 'select',
    options: map(({ id, name }) => ({ value: id, label: name }), companies)
  }
]

const formSettingsMyTeamEdit = ({ companies }) =>
  formSettingsMyTeam({ companies }).map((item) => ({
    ...item,
    show: true
  }))

const settingsNextStep = {
  name: 'document',
  document: 'companyId'
}

export { settingsNextStep, formSettingsMyTeam, formSettingsMyTeamEdit }
