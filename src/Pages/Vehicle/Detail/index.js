import React, { useEffect, useState } from 'react'
import {
  applySpec,
  filter,
  includes,
  isEmpty,
  keys,
  length,
  map,
  pipe,
  prop,
  propOr,
  __
} from 'ramda'
import { Form } from 'antd'
import qs from 'qs'
import { useHistory, useLocation } from 'react-router-dom'
import moment from 'moment'

import DetailContainer from '../../../Containers/Vehicle/Detail'
import { getById, updateVehicle } from '../../../Services/Vehicle'
import { getAll as getAllMaintenances } from '../../../Services/MaintenanceOrders'
import { parseQueryParams } from '../../../utils/queryParams'

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
  const { search, pathname } = useLocation()
  const [defaultMoreFilters, setDefaultMoreFilters] = useState(false)



      
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

  
  
  const changeQueryParams = (search) => {
    return history.replace({
      pathname,
      search
    })
  }
  
  const clearFilter = () => {
    setQuery({
      offset: 0,
      limit: 10
    })
    changeQueryParams('')
    filterForm.resetFields()
    filterForm.setFieldsValue({ plate: vehicle.plate })
  }

  const closeModalAddSerialNumber = () => setVisibleAddSerialNumber(false)

  const gotoDetail = (id) => {
    history.push(`/logged/maintenance/detail/${id}`)
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
    setOffset(current)

    const query = { offset: current - 1 }
    const queryParams = parseQueryParams(search)

    changeQueryParams(qs.stringify({ ...queryParams, ...query }))
  }

  const handleFilter = (values) => {
    const queryParams = parseQueryParams(search)

    changeQueryParams(qs.stringify({ ...queryParams, ...values }))
  }

  useEffect(() => {
    if (!isEmpty(vehicle)) {
      getAllMaintenance()
    }
  }, [search, vehicle])

  useEffect(() => {
    filterForm.setFieldsValue({ plate: vehicle.plate })
  }, [vehicle])

  useEffect(() => {
    if (!isEmpty(match) && isEmpty(vehicle)) {
      getVehicle()
    }
  }, [match])

  useEffect(() => {
    const queryParams = parseQueryParams(search)

    filterForm.setFieldsValue(
      applySpec({
        dates: pipe(
          propOr([], 'dates'),
          map((date) => moment(date))
        ),
        priorities: prop('priorities'),
        services: prop('services'),
        status: prop('status')
      })(queryParams)
    )

    if (
      length(
        filter(
          includes(__, ['status', 'services', 'priorities']),
          keys(queryParams)
        )
      ) > 0
    ) {
      setDefaultMoreFilters(true)
    }
  }, [])

  return (
    <DetailContainer
      addSerialNumber={addSerialNumber}
      defaultMoreFilters={defaultMoreFilters}
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
