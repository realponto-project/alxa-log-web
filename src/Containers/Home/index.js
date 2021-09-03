import React from 'react'
import {
  Row,
  Col,
  Image,
  Card,
  Typography,
  Button,
  Space,
  DatePicker
} from 'antd'

import BarChart from './BarChart'
import VerticalChart from './VerticalChart'
import OrdersSvg from './orders.svg'
import CustomersSvg from './customers.svg'
import EmptyStateOrderSvg from './empty-state-order.svg'
import EmptyStateCustomersSvg from './empty-state-customers.svg'
import styles from './style.module.css'
import CheckoutSvg from './checkout.svg'
import CheckoutEmptySvg from './checkout-empty.svg'
import AvailableSVG from './available.svg'
import AvailableEmptySVG from './available-empty.svg'

const { Link, Text, Title } = Typography
const { RangePicker } = DatePicker

const CardStatus = ({ title, count, redirectPage, srcImage }) => (
  <Card
    style={{
      borderRadius: 5,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
    }}>
    <Row align="middle" justify="space-between">
      <Col span={12}>
        <Text style={{ fontSize: '1rem' }}>{title}</Text>
        <Title level={1} style={{ margin: 0, padding: 0 }}>
          {count > 0 ? count : '-'}
        </Title>
      </Col>
      <Col span={12}>
        <Image preview={false} src={srcImage} alt="orders" />
      </Col>
      <Col span={24}>
        <Link onClick={redirectPage}>Detalhes</Link>
      </Col>
    </Row>
  </Card>
)

const Home = ({
  dateChoosed,
  goToOrders,
  handleChangeDate,
  orderOperationStatus,
  orderStatus,
  querDate
}) => {
  const vehicleTotal = orderStatus
    .filter(
      ({ status }) =>
        status !== 'check-out' &&
        status !== 'solicitation' &&
        status !== 'cancel'
    )
    .reduce((acc, prev) => acc + Number(prev.count), 0)

  const vehicleTotalAvailable = orderStatus
    .filter(({ status }) => status === 'avaiable')
    .reduce((acc, prev) => acc + Number(prev.count), 0)

  const vehicleTotalfinished = orderStatus
    .filter(({ status }) => status === 'check-out')
    .reduce((acc, prev) => acc + Number(prev.count), 0)

  const vehicleTotalSolicitacion = orderStatus
    .filter(({ status }) => status === 'solicitation')
    .reduce((acc, prev) => acc + Number(prev.count), 0)

  const parserDataOrders = orderStatus.reduce((arr, next) => {
    const findItem = arr.find((item) => item.name === next.name)
    if (findItem) {
      arr = arr.map((item) =>
        item.name === next.name ? { ...item, [next.status]: next.count } : item
      )
    }

    if (!findItem) {
      arr = [...arr, { name: next.name, [next.status]: next.count }]
    }

    return arr
  }, [])
  return (
    <Row gutter={[18, 18]}>
      <Col span={24}>
        <h1 className={styles.welcomeTitle}>Bem-vindo</h1>
        <p className={styles.welcomeSubtitle}>
          Ao <b>alxa dashboard</b> para suas análises
        </p>
      </Col>

      <Col span={24}>
        <Row justify="end">
          <Space size="middle">
            <Button
              onClick={() => handleChangeDate('today')}
              ghost={dateChoosed === 'today'}
              className={dateChoosed === 'today' && 'btn-active'}
              size="small"
              shape="round">
              Hoje
            </Button>
            <Button
              onClick={() => handleChangeDate('week')}
              ghost={dateChoosed === 'week'}
              className={dateChoosed === 'week' && 'btn-active'}
              size="small"
              shape="round">
              7 dias
            </Button>
            <Button
              onClick={() => handleChangeDate('month')}
              ghost={dateChoosed === 'month'}
              className={dateChoosed === 'month' && 'btn-active'}
              size="small"
              shape="round">
              30 dias
            </Button>

            <RangePicker
              format="DD-MM-YYYY"
              value={[querDate.start, querDate.end]}
              className={dateChoosed === 'custom' && 'btn-active'}
              onChange={(dates) => handleChangeDate('custom', { dates })}
              bordered={true}
            />
          </Space>
        </Row>
      </Col>

      <Col span={6}>
        <CardStatus
          count={vehicleTotalSolicitacion}
          redirectPage={() => goToOrders(['solicitation'])}
          title="Total de solicitações"
          srcImage={
            vehicleTotalSolicitacion > 0 ? CustomersSvg : EmptyStateCustomersSvg
          }
        />
      </Col>

      <Col span={6}>
        <CardStatus
          count={vehicleTotal}
          redirectPage={() =>
            goToOrders([
              'check-in',
              'avaiable',
              'parking',
              'courtyard',
              'awaiting_repair',
              'dock',
              'wash',
              'supply',
              'external_service'
            ])
          }
          title="Total de veículos"
          srcImage={vehicleTotal > 0 ? OrdersSvg : EmptyStateOrderSvg}
        />
      </Col>

      <Col span={6}>
        <CardStatus
          count={vehicleTotalAvailable}
          redirectPage={() => goToOrders(['avaiable'])}
          title="Total de liberado"
          srcImage={
            vehicleTotalAvailable > 0 ? AvailableSVG : AvailableEmptySVG
          }
        />
      </Col>

      <Col span={6}>
        <CardStatus
          count={vehicleTotalfinished}
          redirectPage={() => goToOrders(['check-out'])}
          title="Total de concluídos"
          srcImage={vehicleTotalfinished > 0 ? CheckoutSvg : CheckoutEmptySvg}
        />
      </Col>

      <Col span={24}>
        <div className={styles.cardBarChart}>
          <BarChart data={parserDataOrders} />
        </div>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <VerticalChart orderOperationStatus={orderOperationStatus} />
        </Card>
      </Col>
    </Row>
  )
}

export default Home
