import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { map } from 'ramda'
import {
  settingsNextStep,
  formSettingsVehicle,
  formSettingsVehicleEdit
} from './formSettings'

const formItemsComponent = {
  input: Input,
  select: Select
}

const renderFormItems = ({ 
  label, 
  name, 
  rules, 
  placeholder, 
  show, 
  typeInput, 
  options = [], 
  mode = null 
}) => {
  const Component = formItemsComponent[typeInput]
  return (
    show && (
      <Form.Item key={name} label={label} name={name} rules={rules}>
        <Component 
          showSearch
          name={name} 
          placeholder={placeholder} 
          options={options} 
          mode={mode} 
          filterOption={(value, option) => (
            option.label.toLowerCase().indexOf(value.toLowerCase()) >= 0
          )}
        />
      </Form.Item>
    )
  )
}

const VehicleForm = ({
  vehicleTypesSource,
  handleCancel,
  visible,
  handleSubmit,
  handleEdit,
  vehicleSelected,
  handleSelectedVehicle
}) => {
  const [formSettings, setFormSettings] = useState(vehicleSelected ? formSettingsVehicleEdit(vehicleTypesSource) : formSettingsVehicle)
  const [form] = Form.useForm()

  const parseOptionItem = item => ({ value: item.id, label: item.name })
  const setOpetionValue = formItem => {
    switch (formItem.name) {
      case 'vehicleTypeId':
        return vehicleTypesSource.map(parseOptionItem)    
      default:
        return []
    }
  }

  const onValuesChangeVisableFomItem = value => {
    const formItem = formSettings.find(item => !item.show && settingsNextStep[Object.keys(value)[0]] === item.name)
    if (formItem) {
      setFormSettings(formSettings.map(item => (
        item.name === formItem.name 
          ? {...formItem, show: true, options: setOpetionValue(formItem) } 
          : item
      )))
    }
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={[
        <Button key="back" onClick={() => {
          handleCancel(false)
          form.resetFields()
          setFormSettings(formSettingsVehicle)
          handleSelectedVehicle(null)
        }}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          onClick={() => form.submit()}
          type="primary">
          Salvar
        </Button>
      ]}
      title={`${vehicleSelected ? 'Editar' : 'Cadastrar'} veículo`}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onValuesChangeVisableFomItem}
        validateTrigger="onChange"
        onFinish={values => {
          if (vehicleSelected) {
            handleEdit({...vehicleSelected, ...values})
          } else {
            handleSubmit(values)
          }
          handleSelectedVehicle(null)
          setFormSettings(formSettingsVehicle)
          form.resetFields()
        }}
        initialValues={vehicleSelected}
      >
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default VehicleForm
