const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const parseOptionItem = ({ id, name }) => ({ value: id, label: name })

const formSettingsBranch = [
{
  label: 'Operação',
  name: 'name',
  placeholder: '',
  show: true,
  rules,
  typeInput: 'input',
  options: []
},
{
  label: 'Unidade',
  name: 'companyId',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: []
},
{
  label: 'Vagas',
  name: 'vacancy',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},
]
const formSettingsBranchEdit = (
  branchsSource, 
) => formSettingsBranch.map(item => {
  if (item.name === 'companyId') {
    return ({ ...item, show: true, options: branchsSource.rows.map(parseOptionItem) })
  }
  
  return ({...item, show: true })
})

const settingsNextStep = {
  name: 'companyId',
  companyId: 'vacancy',
}

export {
  settingsNextStep,
  formSettingsBranch,
  formSettingsBranchEdit
}
