import React from 'react'
import { Image, Typography, Row, Col, Button, Radio, Form } from 'antd'
import { isNil, length, map } from 'ramda'

import noData from '../../../Assets/noData.svg'
import UpdatePhoneSteps from './UpdatePhone'
// import Onboarding from './Onboarding'
import DriverAuthorizationMobileContainer from '../DriverAuthorizationMobile'
import LogoSvg from '../../../Assets/logo.svg'
import DriverAuthorizationQrcode from '../DriverAuthorizationQrcode'

const { Title } = Typography

const MyRadioButton = ({ text, value, checked }) => (
  <Radio.Button
    style={{
      width: '100%',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      marginBottom: '25px'
    }}
    value={value}>
    <Title
      style={{
        padding: '0',
        margin: '0',
        color: checked ? '#1890ff' : 'black'
      }}
      level={2}>
      {text}
    </Title>
  </Radio.Button>
)

const DriverMobileContainer = ({
  driver,
  updatePhone,
  getAuthorization,
  authorizations,
  authorizationId,
  restart,
  plate,
  handleSelecOperation
}) => {
  if (isNil(driver)) {
    return (
      <Row
        style={{
          background: '#F2F2F3',
          padding: '35px 35px',
          minHeight: '100vh',
          textAlign: 'center'
        }}>
        <Col span={24}>
          <Title level={3}>Não foi possível encontrar o motorísta</Title>
        </Col>

        <Col span={24}>
          <Image src={noData} alt="no data" preview={false} width={200} />
        </Col>
      </Row>
    )
  }

  if (driver.phone === '0000000000') {
    return <UpdatePhoneSteps driver={driver} updatePhone={updatePhone} />
  }

  if (authorizationId) {
    return (
      <DriverAuthorizationQrcode
        plate={plate}
        driver={driver}
        restart={restart}
        authorizationId={authorizationId}
      />
    )
  }

  if (length(authorizations) > 0) {
    const [form] = Form.useForm()

    return (
      <Form form={form} onFinish={handleSelecOperation}>
        <Row
          style={{
            background: '#F2F2F3',
            padding: '35px 35px',
            minHeight: '100vh',
            textAlign: 'center'
          }}>
          <Col span={24}>
            <Image src={LogoSvg} alt="logo" preview={false} width={200} />
          </Col>

          <Col span={24}>
            <Form.Item shouldUpdate={true}>
              {() => {
                const { authorizationId } = form.getFieldsValue()
                return (
                  <Form.Item name="authorizationId">
                    <Radio.Group style={{ width: '100%' }}>
                      {map(({ operation, id }) => {
                        return (
                          <MyRadioButton
                            value={id}
                            text={operation.name}
                            checked={authorizationId === operation.id}
                          />
                        )
                      }, authorizations)}
                    </Radio.Group>
                  </Form.Item>
                )
              }}
            </Form.Item>
          </Col>

          <Col span={24}>
            <Row gutter={20}>
              <Col span={12}>
                <Button size="large" block onClick={restart}>
                  Voltar
                </Button>
              </Col>

              <Col span={12}>
                <Form.Item>
                  <Button type="primary" size="large" htmlType="submit" block>
                    Ok
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }

  return <DriverAuthorizationMobileContainer handleSubmit={getAuthorization} />
}

export default DriverMobileContainer
