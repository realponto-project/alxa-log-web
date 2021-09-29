import React from 'react'
import { Form, Input, Modal } from 'antd'

const ModalAddSerialNumber = ({
  handleCancel,
  handleSubmit,
  loading,
  visible
}) => {
  const [form] = Form.useForm()

  return (
    <Modal
      confirmLoading={loading}
      okText="Adicionar"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      title="Adicionar número de série"
      visible={visible}>
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item name="serialNumber" label="Número de série">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalAddSerialNumber
