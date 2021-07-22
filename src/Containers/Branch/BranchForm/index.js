import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { map } from 'ramda'

import {
  settingsNextStep,
  formSettingsBranch,
  formSettingsBranchEdit
} from './formSettings'
import { cnpj } from 'cpf-cnpj-validator'

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

const BranchForm = ({
  handleCancel,
  visible,
  handleSubmit,
  handleEdit,
  branchSelected,
  handleSelectedBranch
}) => {
  const [formSettings, setFormSettings] = useState(branchSelected ? formSettingsBranchEdit : formSettingsBranch)
  const [form] = Form.useForm()

  const onValuesChangeVisableFomItem = async (value) => {
    const propName = Object.keys(value)[0]
    const formItem = formSettings.find(item => !item.show && settingsNextStep[propName] === item.name)
    propName === 'document' &&  value[propName].length > 11 
      ? form.setFieldsValue({ document: cnpj.format(value[propName])}) 
      : null

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
          setFormSettings(formSettingsBranch)
          handleSelectedBranch(null)
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
      title={`${branchSelected ? 'Editar' : 'Cadastrar'} unidade`}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onValuesChangeVisableFomItem}
        validateTrigger="onChange"
        onFinish={values => {
          if (branchSelected) {
            handleEdit({...branchSelected, ...values})
          } else {
            handleSubmit(values)
          }
          handleSelectedBranch(null)
          setFormSettings(formSettingsBranch)
          form.resetFields()
        }}
        initialValues={branchSelected}
      >
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default BranchForm
