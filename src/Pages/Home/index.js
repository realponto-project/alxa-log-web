import React, { useEffect, useState } from 'react'
import HomeContainer from '../../Containers/Home'
import {
  getByStatus, 
  // getByStatusCompany,
  getByStatusOperation,
} from '../../Services/Summary'
import GAInitialize from '../../utils/ga'

const Home = () => {
  const [homeState] = useState({
    customers: null,
    orders: null,
    ordersTotal: [],
    ordersToday: []
  })
  const [orderStatus, setOrderStatus] = useState([])
  // const [orderCompanyStatus, setOrderCompanyStatus] = useState([])
  const [orderOperationStatus, setOrderOperationStatus] = useState([])
  GAInitialize(`/home`)

  useEffect(() => {
    getByStatusAll()
    // getByCompanyAll()
    getByOperationAll()
  }, [])

  const getByStatusAll = async () => {
    try {
      const { data } = await getByStatus()
      setOrderStatus(data)
    } catch (error) {
      window.onerror(`maintenanceOrderStatusSummary: ${error.error}`, window.location.href)
    }
  }

  // const getByCompanyAll = async () => {
  //   try {
  //     const { data } = await getByStatusCompany()
  //     setOrderCompanyStatus(data)
  //   } catch (error) {
  //     console.log('cannot find values of dashboard!')
  //   }
  // }

  const getByOperationAll = async () => {
    try {
      const { data } = await getByStatusOperation()
      setOrderOperationStatus(data)
    } catch (error) {
      window.onerror(`maintenanceOrderOperationStatusSummary: ${error.error}`, window.location.href)
    }
  }

  return (
    <HomeContainer
      orderStatus={orderStatus}
      // orderCompanyStatus={orderCompanyStatus}
      orderOperationStatus={orderOperationStatus}
    />
  )
}

export default Home
