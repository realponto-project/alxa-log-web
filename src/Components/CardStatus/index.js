import React from 'react'
import { Card, Col, Row, Typography} from 'antd'

import styles from './style.module.css'
import CircleBar from '../circleBar'

const { Link, Text, Title } = Typography

const CardStatus = ({ title, count, redirectPage, srcImage, total }) => (
  <Card className={styles.card}>
    <Row align="middle" justify="space-between">
      <Col span={12}>
        <Text style={{ fontSize: '1rem' }}>{title}</Text>
        
        <Title level={1} style={{ margin: 0, padding: 0 }}>
          {count}
          <Text  style={{ fontSize: '1rem' }}>
            /{total}
          </Text>
        </Title>
       
      </Col>
      <Col span={12}>
        <CircleBar icon={srcImage} total={total} count={count} />
      </Col>
      <Col span={24}>
        <Link onClick={redirectPage}>Detalhes</Link>
      </Col>
    </Row>
  </Card>
)


export { CardStatus }
