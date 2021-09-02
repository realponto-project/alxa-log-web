import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, DatePicker } from 'antd'
import { map } from 'ramda'
import { cnpj } from 'cpf-cnpj-validator'

import {
  settingsNextStep,
  formSettingsIncident,
  formSettingsIncidentEdit
} from './formSettings'
import moment from 'moment'

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
  mode = null,
  format = ''
}) => {
  const Component = formItemsComponent[typeInput]
  return (
    show && (
      <Form.Item key={name} label={label} name={name} rules={rules}>
        {typeInput === 'date' ? (
          <DatePicker  format={format} />
        ): (
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
        )}
      </Form.Item>
    )
  )
}

const IncidentForm = ({
  vehiclesSource,
  operationsSource,
  handleCancel,
  visible,
  handleSubmit,
  incidentSelected,
  handleEditSubmit,
  handleSelectedIncident,
}) => {
  const [formSettings, setFormSettings] = useState(incidentSelected ? formSettingsIncidentEdit(vehiclesSource, operationsSource) : formSettingsIncident(vehiclesSource))
  const [form] = Form.useForm()
  const parseOptionItemOperation = item => ({ value: item.id, label: `${item.name} - Filial: ${item.company.name} / ${cnpj.format(item.company.document)}` })

  const setOpetionValue = formItem => {
    switch (formItem.name) {
      case 'operationId':
        return operationsSource.map(parseOptionItemOperation)
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

  const incidentDate = (
    incidentSelected && incidentSelected.incidentDate
      ? moment(incidentSelected.incidentDate)
      : undefined
  )

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={[
        <Button key="back" onClick={() => {
          handleCancel(false)
          form.resetFields()
          setFormSettings(formSettingsIncident(vehiclesSource))
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
      title={`${incidentSelected ? 'Editar' : 'Cadastrar novo'} incidente`}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onValuesChangeVisableFomItem}
        validateTrigger="onChange"
        onFinish={values => {
          if(incidentSelected) {
            handleEditSubmit({ ...incidentSelected, ...values })
          } else {
            handleSubmit(values)
          }
          handleSelectedIncident(null)
          setFormSettings(formSettingsIncident(vehiclesSource))
          form.resetFields()
        }}
        initialValues={{ ...incidentSelected, incidentDate }}
      >
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default IncidentForm
