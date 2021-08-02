const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsDriver = driversSource => [{
  label: 'Condutor do veículo',
  name: 'driverId',
  placeholder: '',
  show: true,
  rules,
  typeInput: 'select',
  options: driversSource.map(item => ({ value: item.id, label: `${item.name} - CNH: ${item.driverLicense}` }))
}]

export {
  formSettingsDriver,
}
