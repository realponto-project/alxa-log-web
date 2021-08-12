import React, { useEffect, useState } from 'react'
import { isEmpty } from 'ramda'
import { Form } from 'antd'

import DetailContainer from '../../../Containers/Vehicle/Detail'
import { getById } from '../../../Services/Vehicle'
import { getAll as getAllMaintenances } from '../../../Services/MaintenanceOrders'
import { useHistory } from 'react-router-dom'

const Detail = ({ match }) => {
  const history = useHistory()
  const [vehicle, setVehicle] = useState({})
  const [maintenances, setMaintenances] = useState({})
  const [loading, setLoading] = useState(false)
  const [filterForm] = Form.useForm()
  const [query, setQuery] = useState({
    offset: 0,
    limit: 10
  })

  const clearFilter = () => {
    setQuery({
      offset: 0,
      limit: 10
    })
    filterForm.resetFields()
    filterForm.setFieldsValue({ plate: vehicle.plate })
  }

  const gotoDetail = (id) => {
    history.push(`/logged/maintenance-detail/${id}`)
  }

  const getAllMaintenance = async () => {
    setLoading(true)
    try {
      const { data } = await getAllMaintenances({
        ...query,
        plate: vehicle.plate
      })
      setMaintenances(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.onerror(
        `getAllMaintenancesByVehicleId: ${error}`,
        window.location.href
      )
    }
  }

  const getVehicle = async () => {
    try {
      const { data } = await getById(match.params.id)

      setVehicle(data)
    } catch (error) {
      window.onerror(`getVehicleById: ${error}`, window.location.href)
    }
  }

  const handleChangeTable = ({ current }) => {
    setQuery({ ...query, offset: current - 1 })
  }

  const handleFilter = (values) => {
    setQuery({ ...query, ...values, offset: 0 })
  }

  useEffect(() => {
    getAllMaintenance()
  }, [query])

  useEffect(() => {
    filterForm.setFieldsValue({ plate: vehicle.plate })
    getAllMaintenance()
  }, [vehicle])

  useEffect(() => {
    if (!isEmpty(match)) {
      getVehicle()
    }
  }, [match])

  return (
    <DetailContainer
      clearFilter={clearFilter}
      filterForm={filterForm}
      gotoDetail={gotoDetail}
      handleFilter={handleFilter}
      handleChangeTable={handleChangeTable}
      loading={loading}
      maintenances={maintenances}
      offset={query.offset + 1}
      vehicle={vehicle}
    />
  )
}

export default Detail
