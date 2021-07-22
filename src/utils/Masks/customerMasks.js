import { length } from 'ramda'

const customerMask = ({ name, value }) => {
  const maskSpec = {
    document: (value) => {
      if (length(value.replace(/\D/g, '')) > 11) {
        return value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')
      } else {
        return value
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')
      }
    },

    phone: (value) => {
      if (length(value) <= 14) {
        return value
          .replace(/\D/g, '')
          .replace(/(\d)/, '($1')
          .replace(/(\d{2})(\d)/, '$1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(-\d{4})\d+?$/, '$1')
      } else {
        return value
          .replace(/\D/g, '')
          .replace(/(\d)/, '($1')
          .replace(/(\d{2})(\d)/, '$1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .replace(/(-\d{4})\d+?$/, '$1')
      }
    },

    zipcode: (value) => {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
    }
  }

  const applyMask = maskSpec[name] || ((value) => value)

  return { name, value: applyMask(value) }
}

export default customerMask
