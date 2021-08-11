import React, { useEffect, useState } from 'react'
import { isEmpty } from 'ramda'

import DetailContainer from '../../../Containers/Vehicle/Detail'
import { getById } from '../../../Services/Vehicle'

const Detail = ({ match }) => {
  const [vehicle, setVehicle] = useState({})

  const getVehicle = async () => {
    try {
      const { data } = await getById(match.params.id)

      setVehicle(data)
    } catch (error) {
      console.error(error)
      window.onerror(`getVehicleById: ${error}`, window.location.href)
    }
  }

  useEffect(() => {
    if (!isEmpty(match)) {
      getVehicle()
    }
  }, [match])

  return <DetailContainer vehicle={vehicle} />
}

export default Detail
