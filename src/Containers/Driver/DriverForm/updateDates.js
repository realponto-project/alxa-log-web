import React from 'react'
import { DatePicker, Form, Modal, Select } from 'antd'

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
            <Option value="expireDriverLicense">Vencimento da CNH</Option>
            <Option value="expireASO">Vencimento da ASO</Option>
            <Option value="expireProtocolInsuranceCompany">
              Vencimento da seguradora
            </Option>
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
