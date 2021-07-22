import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { map } from 'ramda'
import formSettingsVehicleType from './formSettings'

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

const VehicleTypeForm = ({
  handleCancel,
  visible,
  handleSubmit,
  handleEdit,
  vehicleTypeSelected,
  handleSelectedVehicleType
}) => {
  const [formSettings, setFormSettings] = useState(formSettingsVehicleType)
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={[
        <Button key="back" onClick={() => {
          handleCancel(false)
          form.resetFields()
          setFormSettings(formSettingsVehicleType)
          handleSelectedVehicleType(null)
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
      title={`${vehicleTypeSelected ? 'Editar' : 'Cadastrar'} tipo de veículo`}
    >
      <Form
        form={form}
        layout="vertical"
        validateTrigger="onChange"
        onFinish={values => {
          if (vehicleTypeSelected) {
            handleEdit({...vehicleTypeSelected, ...values})
          } else {
            handleSubmit(values)
          }
          handleSelectedVehicleType(null)
          setFormSettings(formSettingsVehicleType)
          form.resetFields()
        }}
        initialValues={vehicleTypeSelected}
      >
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default VehicleTypeForm
