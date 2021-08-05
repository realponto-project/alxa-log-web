import React from 'react'
import { Button, Image, Input, Typography } from 'antd'

import styles from './style.module.css'
import Logo from '../../../Assets/logo.svg'

const { Text } = Typography 

const DriverAuthorizationMobile = () => {
  return(
    <div className={styles.divMain}>
      <Image alt="" src={Logo} width="161px" height="161px"/>
      <div className={styles.divText}>
        <Text style={{ color: '#8E8D92' }} level={4}>
        Informe a placa do veículo que irá ficar estacionado ou retirado da filial.
        </Text>
      </div>
      <Input size="large" placeholder="PLACA" className={styles.inputPlate}/>
      <Button type="primary" size="large" className={styles.buttonSearch}>Buscar autorização</Button>
    </div>
  )
}

export default DriverAuthorizationMobile
