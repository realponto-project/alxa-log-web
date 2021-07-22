import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { map } from 'ramda'
import {
  settingsNextStep,
  formSettingsDriver,
  formSettingsDriverEdit
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
}) => {
  const Component = formItemsComponent[typeInput]
  return (
    show && (
      <Form.Item key={name} label={label} name={name} rules={rules}>
        <Component 
          showSearch
          name={name} 
          placeholder={placeholder}
        />
      </Form.Item>
    )
  )
}

const DriverForm = ({
  handleCancel,
  visible,
  handleSubmit,
  handleEdit,
  driverSelected,
  handleSelectedDriver
}) => {
  const [formSettings, setFormSettings] = useState(driverSelected ? formSettingsDriverEdit : formSettingsDriver)
  const [form] = Form.useForm()

  const onValuesChangeVisableFomItem = value => {
    const formItem = formSettings.find(item => !item.show && settingsNextStep[Object.keys(value)[0]] === item.name)
    if (formItem) {
      setFormSettings(formSettings.map(item => (
        item.name === formItem.name 
          ? {...formItem, show: true } 
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
          setFormSettings(formSettingsDriver)
          handleSelectedDriver(null)
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
      title={`${driverSelected ? 'Editar' : 'Cadastrar'} motorista`}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onValuesChangeVisableFomItem}
        validateTrigger="onChange"
        onFinish={values => {
          if (driverSelected) {
            handleEdit({...driverSelected, ...values})
          } else {
            handleSubmit(values)
          }
          handleSelectedDriver(null)
          setFormSettings(formSettingsDriver)
          form.resetFields()
        }}
        initialValues={driverSelected}
      >
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default DriverForm
