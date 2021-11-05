import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Radio, DatePicker } from 'antd'
import { map, isEmpty } from 'ramda'
import {
  settingsNextStep,
  formSettingsDriver,
  formSettingsDriverEdit
} from './formSettings'

const formItemsComponent = {
  input: Input,
  select: Select,
  radio: Radio.Group,
  datepicker: DatePicker,
}

const renderFormItems = (driverSelected) => ({
  label,
  name,
  rules,
  placeholder,
  show,
  typeInput,
  options,
  format,
  disabled
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
          format={format}
          disabled={!isEmpty(driverSelected) ? disabled : false}
        />
      </Form.Item>
    )
  )
}

const DriverForm = ({
  form,
  handleCancel,
  visible,
  handleSubmit,
  handleEdit,
  driverSelected,
  handleSelectedDriver
}) => {

  console.log(">>",driverSelected);

  const [formSettings, setFormSettings] = useState(!isEmpty(driverSelected) ? formSettingsDriverEdit : formSettingsDriver)

  const onValuesChangeVisableFomItem = value => {
    const formItem = formSettings.find(item => !item.show && settingsNextStep[Object.keys(value)[0]] === item.name)
    if (formItem) {
      setFormSettings(formSettings.map(item => (
        item.name === formItem.name
          ? { ...formItem, show: true }
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
          handleSelectedDriver({})
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
      title={`${!isEmpty(driverSelected) ? 'Editar' : 'Cadastrar'} motorista`}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onValuesChangeVisableFomItem}
        validateTrigger="onChange"
        onFinish={values => {
          if (!isEmpty(driverSelected)) {
            handleEdit({ ...driverSelected, ...values })
          } else {
            handleSubmit(values, () => setFormSettings(formSettingsDriver))
          }
          handleSelectedDriver({})
        }}
        initialValues={driverSelected}
      >
        {map(renderFormItems(driverSelected), formSettings)}
      </Form>
    </Modal>
  )
}

export default DriverForm
