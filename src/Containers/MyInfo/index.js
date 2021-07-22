import React from 'react'
import {
  Card,
  Typography,
  Row,
  Col,
  Input,
  Form,
  DatePicker,
  Button
} from 'antd'
import {
  always,
  applySpec,
  head,
  ifElse,
  keys,
  pipe,
  prop,
  replace,
  __
} from 'ramda'
import moment from 'moment'
import mask, { myInfoMask } from '../../utils/Masks'

const { Title, Text } = Typography

const MyInfo = ({ loading, user, updateMyInfo }) => {
  const [form] = Form.useForm()

  const buildIntialValues = applySpec({
    document: pipe(
      prop('document'),
      mask('##.###.###-#'),
      replace(/^\.\.-$/, '')
    ),
    phone: prop('phone'),
    birthday: ifElse(
      prop('birthday'),
      pipe(prop('birthday'), moment),
      always(undefined)
    )
  })

  const onValuesChange = (dataChange) => {
    const { name, value } = myInfoMask(
      applySpec({
        name: pipe(keys, head),
        value: (item) => pipe(pipe(keys, head), prop(__, item))(item)
      })(dataChange)
    )

    form.setFieldsValue({
      [name]: value
    })
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={5}>Informações do usuário</Title>
            </Col>
            <Col span={12}>
              <Text strong>Nome completo</Text>
              <p>{user && user.name}</p>
            </Col>
            <Col span={12}>
              <Text strong>Email</Text>
              <p>{user && user.email}</p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            onValuesChange={onValuesChange}
            onFinish={updateMyInfo}
            initialValues={buildIntialValues(user)}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Title level={5}>Informações pessoais</Title>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="document"
                  label="Identidade"
                  rules={[
                    { required: true, message: 'Este campo é obrigatório!' }
                  ]}>
                  <Input maxLength={11} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="phone"
                  label="Telefone"
                  rules={[
                    { required: true, message: 'Este campo é obrigatório!' }
                  ]}>
                  <Input addonBefore="+55 " maxLength={17} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="birthday"
                  label="Data de Nascimento"
                  rules={[
                    { required: true, message: 'Este campo é obrigatório!' }
                  ]}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ width: '100%' }}
                    placeholder="Data de Nascimento"
                  />
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button loading={loading} htmlType="submit" type="primary">
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default MyInfo
