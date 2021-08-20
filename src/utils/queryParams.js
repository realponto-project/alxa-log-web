import qs from 'qs'

export const parseQueryParams = (search) => {
  return qs.parse(search.substring(1))
}
