import customer from './customerMasks'
import { myInfoMask as myInfo } from './myInfoMasks'

export const customerMask = customer

export const myInfoMask = myInfo

const mask = (pattern) => (value) => {
  let i = 0
  const v = String(value)
  return pattern.replace(/#/g, () => v[i++] || '')
}

export default mask
