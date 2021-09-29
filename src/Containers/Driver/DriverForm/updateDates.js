import React from 'react'
import { DatePicker, Form, Modal, Select } from 'antd'
import moment from 'moment'
import { filter, map } from 'ramda'

const { Option } = Select

const ModalUpdateDates = ({
  visible,
  setShowModal,
  driverSelected,
  handleSubmit
}) => {
  const [form] = Form.useForm()

  const closeModal = () => {
    setShowModal(false)
    form.resetFields()
  }

  const options = [
    { value: 'expireDriverLicense', label: 'Vencimento da CNH' },
    { value: 'expireASO', label: 'Vencimento da ASO' },
    {
      value: 'expireProtocolInsuranceCompany',
      label: 'Vencimento da seguradora'
    }
  ]

  const expireDates = filter(
    ({ value: field }) => moment(driverSelected[field]) < moment(),
    options
  )

  return (
    <Modal
      visible={visible}
      title="Atualizar data"
      okText="Salvar"
      onOk={() => form.submit()}
      onCancel={closeModal}>
      <Form
        onFinish={({ field, value }) => {
          handleSubmit({
            ...driverSelected,
            [field]: value
          })
          closeModal()
        }}
        form={form}
        layout="vertical">
        <Form.Item name="field" label="Campo" rules={[{ required: true }]}>
          <Select placeholder="Selecione o campo a ser atualizado">
            {map(
              ({ value, label }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ),
              expireDates
            )}
          </Select>
        </Form.Item>

        <Form.Item name="value" label="Vencimento" rules={[{ required: true }]}>
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalUpdateDates
