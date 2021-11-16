import moment from 'moment'
import 'moment/locale/pt-br'

const messageDates = ({ weekdays, days, hours, minutes }) => {
  let message = 'poucos minutos'
  if (weekdays > 0) {
    message = `${weekdays} ${weekdays > 1 ? 'semanas' : 'semana'}`
  }

  if (weekdays === 0 && days > 0) {
    message = `${days} ${days > 1 ? 'dias' : 'dia'}`
  }

  if (days === 0 && weekdays === 0 && hours) {
    message = `${hours.toString().length === 1 ? '0' + hours : hours}h${
      minutes.toString().length >= 2 ? minutes : '0' + minutes
    }`
  }

  if (days === 0 && weekdays === 0 && hours === 0 && minutes) {
    message = `${minutes.toString().length >= 2 ? minutes : '0' + minutes}min`
  }

  return message
}

const messageDatesObject = ({ weekdays, days, hours, minutes }) => {
  let message = { time: '', descriptionTime: 'poucos minutos' }
  if (weekdays > 0) {
    message = {
      time: weekdays,
      descriptionTime: `${weekdays > 1 ? 'semanas' : 'semana'}`
    }
  }

  if (weekdays === 0 && days > 0) {
    message = { time: days, descriptionTime: `${days > 1 ? 'dias' : 'dia'}` }
  }

  if (days === 0 && weekdays === 0 && hours) {
    message = {
      time: `${hours.toString().length === 1 ? '0' + hours : hours}h${
        minutes.toString().length >= 2 ? minutes : '0' + minutes
      }`,
      descriptionTime: ''
    }
  }

  if (days === 0 && weekdays === 0 && hours === 0 && minutes) {
    message = {
      time: `${minutes.toString().length >= 2 ? minutes : '0' + minutes}min`,
      descriptionTime: ''
    }
  }

  return message
}

const diffTime = (createdAt, updatedAt, status, objectValues = false) => {
  const lastTime = status === 'check-out' ? updatedAt : new Date()
  const d = new Date(lastTime) - new Date(createdAt)
  const weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7)
  const days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7)
  const hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24)
  const minutes = Math.floor(
    d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60
  )

  if (objectValues) {
    return messageDatesObject({
      weekdays,
      days,
      hours,
      minutes
    })
  }

  return messageDates({
    weekdays,
    days,
    hours,
    minutes
  })
}

export default diffTime
