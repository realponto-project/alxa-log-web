import { pipe, replace } from 'ramda'

const parserCoin = (value) =>
  value < 100 ? ('00' + value).replace(/(\d)(\d{3})$/, '$2') : value

export const formatPrice = pipe(
  parserCoin,
  String,
  replace(/\D/g, ''),
  replace(/(\d)(\d{2})$/, '$1,$2'),
  replace(/(\d)(\d{3},\d{2})$/, '$1.$2'),
  replace(/(\d)(\d{3}.\d{3},\d{2})$/, '$1.$2')
)
