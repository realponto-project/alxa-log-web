import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import GAInitialize from '../../../utils/ga'

import BranchDetail from '../../../Containers/Branch/Detail'
import { getById, getSummary } from '../../../Services/Branch'
import { getMaintenanceCompanyId } from '../../../Services/MaintenanceOrders'

const Detail = ({
  match,
  history,
}) => {
  const [company, setCompany] = useState({
    name: '',
    cnpj: '',
  })
  const [chartData, setChartData] = useState([])
  const [offset, setoffset] = useState(1)
  const [datasource, setDatasource] = useState({ rows: [], count: 0 })

  
  GAInitialize(`/branch/${match.params.id}`)

  useEffect(() => {
    getCompany()
    summaryChart()
    getAllMaintenanceCompany({ companyId: match.params.id })
  }, [])

  const getCompany = async() => {
    try {
      const { data } = await getById(match.params.id)
      setCompany(data)
    } catch (error) {
      window.onerror(`CompanyId: ${error.error}`, window.location.href)
    }
  }

  const summaryChart = async () => {
    try {
      const { data } = await getSummary(match.params.id)
      setChartData(data)
    } catch (error) {
      window.onerror(`summaryChart: ${error.error}`, window.location.href)
    }
  }

  const getAllMaintenanceCompany = async (query) => {
    try {
      const { data } = await getMaintenanceCompanyId(query)
      setDatasource(data)
    } catch (error) {
      window.onerror(`MaintenanceCompany: ${error.error}`, window.location.href)
    }
  } 

  const handleChangeTableEvent = ({ current }) => {
    setoffset(current)
    const query = { offset: (current - 1), companyId: match.params.id }
    getAllMaintenanceCompany(query)
  }

  return (
    <BranchDetail
      company={company}
      chartData={chartData}
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
      datasource={datasource}
      gotoDetailOrder={id => history.push(`/logged/maintenance-detail/${id}`)}
    />
  )
}

export default withRouter(Detail)
