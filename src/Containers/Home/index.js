import React from 'react'
import {
  Row,
  Col,
  Image,
  Card
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

const Home = ({
  orderStatus,
  orderOperationStatus,
}) => {
  const vehicleTotal = orderStatus
    .filter(({ status }) => status !== 'check-out' && status !== 'solicitation' && status !== 'cancel')
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
    const findItem = arr.find(item => item.name === next.name)
    if(findItem) {
      arr = arr.map(item => item.name === next.name ? {...item, [next.status]: next.count } : item)
    }
  
    if(!findItem) {
      arr = [...arr, { name: next.name, [next.status]: next.count }]
    }
  
   return arr
  }, [])
  return (
    <Row gutter={[18, 18]}>
      <Col span={24}>
        <h1 className={styles.welcomeTitle}>Bem-vindo</h1>
        <p className={styles.welcomeSubtitle}>Ao <b>alxa dashboard</b> para suas análises</p>
      </Col>     

      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de solicitações</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotalSolicitacion > 0 ? vehicleTotalSolicitacion :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotalSolicitacion > 0 ? CustomersSvg : EmptyStateCustomersSvg} alt="orders" />
        </div>
      </Col>


      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de veículos</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotal > 0 ? vehicleTotal :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotal > 0 ? OrdersSvg : EmptyStateOrderSvg} alt="orders" />
        </div>
      </Col>

      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de liberado</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotalAvailable > 0 ? vehicleTotalAvailable :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotalAvailable > 0 ? AvailableSVG : AvailableEmptySVG} alt="orders" />
        </div>
      </Col>

      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de concluídos</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotalfinished > 0 ? vehicleTotalfinished :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotalfinished > 0 ? CheckoutSvg : CheckoutEmptySvg} alt="orders" />
        </div>
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
