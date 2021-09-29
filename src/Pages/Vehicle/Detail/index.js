import React, { useEffect, useState } from 'react'
import { isEmpty } from 'ramda'
import { Form } from 'antd'

import DetailContainer from '../../../Containers/Vehicle/Detail'
import { getById, updateVehicle } from '../../../Services/Vehicle'
import { getAll as getAllMaintenances } from '../../../Services/MaintenanceOrders'
import { useHistory } from 'react-router-dom'

const Detail = ({ match }) => {
  const history = useHistory()
  const [vehicle, setVehicle] = useState({})
  const [maintenances, setMaintenances] = useState({})
  const [loading, setLoading] = useState(false)
  const [filterForm] = Form.useForm()
  const [visibleAddSerialNumber, setVisibleAddSerialNumber] = useState(false)
  const [query, setQuery] = useState({
    offset: 0,
    limit: 10
  })

  const addSerialNumber = async (values) => {
    setLoading(true)
    try {
      await updateVehicle({ ...values, id: match.params.id })
      getVehicle()
      closeModalAddSerialNumber()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      closeModalAddSerialNumber()
      window.onerror(`addSerialNumber: ${error}`, window.location.href)
    }
  }

  const clearFilter = () => {
    setQuery({
      offset: 0,
      limit: 10
    })
    filterForm.resetFields()
    filterForm.setFieldsValue({ plate: vehicle.plate })
  }

  const closeModalAddSerialNumber = () => setVisibleAddSerialNumber(false)

  const gotoDetail = (id) => {
    history.push(`/logged/maintenance-detail/${id}`)
  }

  const getAllMaintenance = async () => {
    setLoading(true)
    if (vehicle.plate) {
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
    if (!isEmpty(vehicle)) {
      getAllMaintenance()
    }
  }, [query, vehicle])

  useEffect(() => {
    filterForm.setFieldsValue({ plate: vehicle.plate })
  }, [vehicle])

  useEffect(() => {
    if (!isEmpty(match)) {
      getVehicle()
    }
  }, [match])

  return (
    <DetailContainer
      addSerialNumber={addSerialNumber}
      clearFilter={clearFilter}
      closeModalAddSerialNumber={closeModalAddSerialNumber}
      filterForm={filterForm}
      gotoDetail={gotoDetail}
      handleChangeTable={handleChangeTable}
      handleFilter={handleFilter}
      loading={loading}
      maintenances={maintenances}
      offset={query.offset + 1}
      showModalAddSerialNumber={() => setVisibleAddSerialNumber(true)}
      vehicle={vehicle}
      visibleAddSerialNumber={visibleAddSerialNumber}
    />
  )
}

export default Detail
