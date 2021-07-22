import { cpf } from 'cpf-cnpj-validator'
import { isEmpty } from 'ramda'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsMyTeam = [{
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
}
]

const formSettingsMyTeamEdit = formSettingsMyTeam.map(item => ({...item, show: true }))

const settingsNextStep = {
  name: 'document',
}

export {
  settingsNextStep,
  formSettingsMyTeam,
  formSettingsMyTeamEdit
}
