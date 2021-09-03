import React, { useEffect, useState } from 'react'
import qs from 'qs'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { applySpec, path } from 'ramda'

import HomeContainer from '../../Containers/Home'
import {
  getByStatus,
  // getByStatusCompany,
  getByStatusOperation
} from '../../Services/Summary'
import GAInitialize from '../../utils/ga'

const Home = () => {
  const history = useHistory()
  // const [homeState] = useState({
  //   customers: null,
  //   orders: null,
  //   ordersTotal: [],
  //   ordersToday: []
  // })
  const [orderStatus, setOrderStatus] = useState([])
  // const [orderCompanyStatus, setOrderCompanyStatus] = useState([])
  const [orderOperationStatus, setOrderOperationStatus] = useState([])
  const [querDate, setQueryDate] = useState({
    start: moment().subtract(1, 'month').startOf('day'),
    end: moment().endOf('day')
  })
  const [dateChoosed, setDateChoosed] = useState('month')

  GAInitialize('/home')

  const getByStatusAll = async (params) => {
    try {
      const { data } = await getByStatus(params)
      setOrderStatus(data)
    } catch (error) {
      window.onerror(
        `maintenanceOrderStatusSummary: ${error.error}`,
        window.location.href
      )
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

  const getByOperationAll = async (params) => {
    try {
      const { data } = await getByStatusOperation(params)
      setOrderOperationStatus(data)
    } catch (error) {
      window.onerror(
        `maintenanceOrderOperationStatusSummary: ${error.error}`,
        window.location.href
      )
    }
  }

  const goToOrders = (status) => {
    const searchValueLocal = qs.parse(localStorage.getItem('searchValue'))
    const queryFilters = qs.stringify({ ...searchValueLocal, status })

    localStorage.setItem('searchValue', queryFilters)
    history.push({
      pathname: '/logged/maintenance/manager',
      search: queryFilters
    })
  }

  const handleChangeDate = (type, options = {}) => {
    setDateChoosed(type)

    const end = moment().endOf('day')
    const { dates } = options

    switch (type) {
      case 'today':
        setQueryDate({ start: moment().startOf('day'), end })
        break
      case 'week':
        setQueryDate({
          start: moment().subtract(1, 'week').startOf('day'),
          end
        })
        break
      case 'month':
        setQueryDate({
          start: moment().subtract(1, 'month').startOf('day'),
          end
        })
        break
      case 'custom':
        setQueryDate({ start: dates[0], end: dates[1] })
        break
    }
  }

  useEffect(() => {
    const dates = applySpec({
      start: path(['start', '_d']),
      end: path(['end', '_d'])
    })(querDate)

    // getByCompanyAll()
    getByOperationAll({ dates })
    getByStatusAll({ dates })
  }, [querDate])

  return (
    <HomeContainer
      dateChoosed={dateChoosed}
      goToOrders={goToOrders}
      handleChangeDate={handleChangeDate}
      // orderCompanyStatus={orderCompanyStatus}
      orderOperationStatus={orderOperationStatus}
      orderStatus={orderStatus}
      querDate={querDate}
    />
  )
}

export default Home
