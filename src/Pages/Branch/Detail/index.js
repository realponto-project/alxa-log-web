import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import GAInitialize from '../../../utils/ga'

import BranchDetail from '../../../Containers/Branch/Detail'
import { getById, getSummary } from '../../../Services/Branch'
import { getMaintenanceCompanyId } from '../../../Services/MaintenanceOrders'
import { Form } from 'antd'

const Detail = ({ match, history }) => {
  const [filterForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState({
    name: '',
    cnpj: ''
  })
  const [chartData, setChartData] = useState([])
  const [offset, setOffset] = useState(1)
  const [query, setQuery] = useState({})
  const [datasource, setDatasource] = useState({ rows: [], count: 0 })
  GAInitialize(`/branch/${match.params.id}`)

  const getCompany = async () => {
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
    setLoading(true)
    try {
      const { data } = await getMaintenanceCompanyId(query)
      setDatasource(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(`MaintenanceCompany: ${error.error}`, window.location.href)
    }
  }

  const handleChangeTableEvent = ({ current }) => {
    setOffset(current)
  }

  useEffect(() => {
    getCompany()
    summaryChart()
  }, [])

  useEffect(() => {
    getAllMaintenanceCompany({
      ...query,
      companyId: match.params.id,
      offset: offset - 1
    })
  }, [offset, query])

  return (
    <BranchDetail
      company={company}
      chartData={chartData}
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
      datasource={datasource}
      gotoDetailOrder={(id) => history.push(`/logged/maintenance/detail/${id}`)}
      handleFilter={(values) => {
        setQuery(values)
        setOffset(1)
      }}
      clearFilter={() => {
        setQuery({})
        setOffset(1)
        filterForm.resetFields()
      }}
      filterForm={filterForm}
      loading={loading}
    />
  )
}

export default withRouter(Detail)
