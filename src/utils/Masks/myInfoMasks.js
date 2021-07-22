import { length } from 'ramda'

const myInfoMask = ({ name, value }) => {
  const maskSpec = {
    document: (value) => {
      return value
        .toUpperCase()
        .replace(/[^\d|X]/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d|X)/, '$1-$2')
        .replace(/(-[\d|X]{1})\d+?$/, '$1')
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
    }
  }

  const applyMask = maskSpec[name] || ((value) => value)

  return { name, value: applyMask(value) }
}

const parseValuePTbr= value => {
  const replaceValue =  String(value).replace(/\D/g, '')
  const price = replaceValue.length === 4 ? String(Number(replaceValue)) : replaceValue
    
    if ( price.length === 1 && price === '0') {
      return 'R$ 0,00'
    }

    if ( price.length === 1) {
      return price.replace(/(\d{1,2})/, 'R$ 0,$1')
    }
    
    if ( price.length === 3) {
      return price.replace(/(\d{1})(\d{2})/, 'R$ $1,$2')
    }

    if ( price.length <= 5) {
      return price.replace(/(\d{2,3})(\d{2})/, 'R$ $1,$2')
    }
    if ( price.length === 6) {
      return price.replace(/(\d{1})(\d{3})(\d{2})/, 'R$ $1.$2,$3')
    }
    if ( price.length <= 8) {
      return price.replace(/(\d{2,3})(\d{3})(\d{2})/, 'R$ $1.$2,$3')
    }
    
    if ( price.length <= 9) {
      return price.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, 'R$ $1.$2.$3,$4')
    }

    if ( price.length <= 11) {
      return price.replace(/(\d{2,3})(\d{3})(\d{3})(\d{2})/, 'R$ $1.$2.$3,$4')
    }

    if ( price.length <= 12) {
      return price.replace(/(\d{1})(\d{3})(\d{3})(\d{3})(\d{2})/, 'R$ $1.$2.$3.$4,$5')
    }
    
    if ( price.length <= 14) {
      return price.replace(/(\d{2,3})(\d{3})(\d{3})(\d{3})(\d{2})/, 'R$ $1.$2.$3.$4,$5')
    }

    return value.slice(0, 21)
}

export {
  parseValuePTbr,
  myInfoMask,
}
