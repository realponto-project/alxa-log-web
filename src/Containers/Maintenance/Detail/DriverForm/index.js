import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Modal, Select, DatePicker } from 'antd'
import { map } from 'ramda'

import { formSettingsDriver } from './formSettings'

const formItemsComponent = {
  input: Input,
  select: Select,
  textArea: Input.TextArea
}

const renderFormItems = ({
  label,
  name,
  rules,
  placeholder,
  show,
  typeInput,
  options = [],
  mode = null,
  format = ''
}) => {
  const Component = formItemsComponent[typeInput]
  return (
    show && (
      <Form.Item key={name} label={label} name={name} rules={rules}>
        {typeInput === 'date' ? (
          <DatePicker format={format} />
        ) : (
          <Component
            showSearch
            name={name}
            placeholder={placeholder}
            options={options}
            mode={mode}
            filterOption={(value, option) =>
              option.label.toLowerCase().indexOf(value.toLowerCase()) >= 0
            }
          />
        )}
      </Form.Item>
    )
  )
}

const DriverForm = ({
  driversSource,
  handleCancel,
  visible,
  handleSubmitDriver,
  handleSubmitUpdateDriver,
  order
}) => {
  const [formSettings, setFormSettings] = useState(
    formSettingsDriver(driversSource)
  )
  const [form] = Form.useForm()
  const hasSecondDriver = order.maintenanceOrderDrivers.length > 1

  useEffect(() => {
    setFormSettings(formSettingsDriver(driversSource))
  }, [driversSource])

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={[
        <Button
          key="back"
          onClick={() => {
            handleCancel()
            form.resetFields()
          }}>
          Cancelar
        </Button>,
        <Button key="submit" onClick={() => form.submit()} type="primary">
          Salvar
        </Button>
      ]}
      title={`${hasSecondDriver ? 'Editar' : 'Adicionar'} condutor do veículo`}>
      <Form
        form={form}
        layout="vertical"
        validateTrigger="onChange"
        onFinish={(values) => {
          if (hasSecondDriver) {
            handleSubmitUpdateDriver(values)
          } else {
            handleSubmitDriver(values)
          }
          form.resetFields()
        }}
        initialValues={
          hasSecondDriver
            ? { driverId: order.maintenanceOrderDrivers[1].driverId }
            : {}
        }>
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default DriverForm
