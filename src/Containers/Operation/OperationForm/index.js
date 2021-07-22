import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { map } from 'ramda'
import {
  settingsNextStep,
  formSettingsBranch,
  formSettingsBranchEdit
} from './formSettings'

const formItemsComponent = {
  input: Input,
  select: Select,
  textArea: Input.TextArea,
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

const OperationForm = ({
  branchsSource,
  handleCancel,
  visible,
  handleSubmit,
  handleEdit,
  operationSelected,
  handleSelectedOperation
}) => {
  const [formSettings, setFormSettings] = useState(operationSelected ? formSettingsBranchEdit(branchsSource) : formSettingsBranch)
  const [form] = Form.useForm()
  const parseOptionItem = item => ({ value: item.id, label: item.name })
  const setOpetionValue = formItem => {
    switch (formItem.name) {
      case 'companyId':
        return branchsSource.rows.map(parseOptionItem)   
      default:
        return formItem.options
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
          setFormSettings(formSettingsBranch)
          handleSelectedOperation(null)
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
      title={`${operationSelected ? 'Editar' : 'Cadastrar'} operação`}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onValuesChangeVisableFomItem}
        validateTrigger="onChange"
        onFinish={values => {
          if (operationSelected) {
            handleEdit({...operationSelected, ...values})
          } else {
            handleSubmit(values)
          }
          handleSelectedOperation(null)
          setFormSettings(formSettingsBranch)
          form.resetFields()
        }}
        initialValues={operationSelected}
      >
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default OperationForm
