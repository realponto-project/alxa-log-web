import { isValid as cnpjIsValid } from '@fnando/cnpj'
import { test } from 'ramda'

const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateCNPJ = (value) => {
  if (!cnpjIsValid(value)) {
    return Promise.reject(new Error('CNPJ inválido'))
  } else {
    return Promise.resolve()
  }
}

export const validateEmail = (value) => {
  if (!test(regexEmail, value)) {
    return Promise.reject(new Error('Email inválido'))
  } else {
    return Promise.resolve()
  }
}
