import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { map, omit } from 'ramda'
import {
  settingsNextStep,
  formSettingsMyTeam,
  formSettingsMyTeamEdit
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

const MyTeamForm = ({
  handleCancel,
  visible,
  handleSubmit,
  handleEdit,
  myTeamSelected,
  handleSelectedMyTeam
}) => {
  const [formSettings, setFormSettings] = useState(myTeamSelected ? formSettingsMyTeamEdit : formSettingsMyTeam)
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
          setFormSettings(formSettingsMyTeam)
          handleSelectedMyTeam(null)
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
      title={`${myTeamSelected ? 'Editar' : 'Cadastrar'} usuário`}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onValuesChangeVisableFomItem}
        validateTrigger="onChange"
        onFinish={values => {
          if (myTeamSelected) {
            handleEdit({...myTeamSelected, ...values})
          } else {
            handleSubmit(values)
          }
          handleSelectedMyTeam(null)
          setFormSettings(formSettingsMyTeam)
          form.resetFields()
        }}
        initialValues={omit(['document'], myTeamSelected)}
      >
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default MyTeamForm
