import React from 'react'
import Voucher from '../../Components/Voucher'
import { Row, Col, Button, Image } from 'antd'
import wazePng from './waze.png'

const VoucherMobile = ({ maintenanceOrder }) =>{
  const openWaze = () => {
    const address = `${maintenanceOrder.company.street}, ${maintenanceOrder.company.streetNumber} ${maintenanceOrder.company.neighborhood} - ${maintenanceOrder.company.city}/${maintenanceOrder.company.state}`
    return window.open(`https://waze.com/ul?q=${encodeURI(address)}`, '_blank')
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: '24px' }}>
      <Col span={24}>
        <Voucher maintenanceSelected={maintenanceOrder} showButton={false}/>
      </Col>
      <Col span={24}>
        {
        maintenanceOrder.company.street && (
          <Button block size="large" onClick={openWaze}>
            <span style={{ marginRight: '10px' }}>Abrir waze</span>
            <Image src={wazePng} width={20} height={20} preview={false} />
          </Button>
        )
        }
      </Col>
    </Row>
  )
} 

export default VoucherMobile
