import React from 'react'
import { Button, Image, Typography } from 'antd'

import styles from './style.module.css'
import Logo from '../../../Assets/logo.svg'

const { Text } = Typography

const DriverOperationMobile = () => {
  return (
    <div className={styles.divMain}>
      <Image alt="" src={Logo} width="161px" height="161px" />
      <div className={styles.divText}>
        <Text style={{ color: '#8E8D92' }} level={4}>
          Selecione a operação, que você deseja estacionar ou retirar o veículo.
        </Text>
      </div>
      <Button className={styles.buttonOperation}>CHEVROLET</Button>
      <Button className={styles.buttonOperation}>VOLKSWAGEN</Button>
      <Button className={styles.buttonOperation}>MERCEDES-BENZ</Button>
      <Button className={styles.buttonOperation}>VOLVO</Button>
      <Button className={styles.buttonOperation}>SCANIA</Button>
    </div>
  )
}

export default DriverOperationMobile
