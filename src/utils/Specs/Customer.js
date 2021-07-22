import { always, applySpec, ifElse, pathOr, prop } from 'ramda'

export const buildAddCustomer = (expand) =>
  applySpec({
    address: ifElse(
      () => expand,
      applySpec({
        city: prop('city'),
        complementary: prop('complementary'),
        neighborhood: prop('neighborhood'),
        reference: prop('reference'),
        states: prop('state'),
        street: prop('street'),
        streetNumber: prop('streetNumber'),
        zipcode: prop('zipcode')
      }),
      always(null)
    ),
    document: prop('document'),
    id: prop('id'),
    name: prop('name'),
    phone: prop('phone'),
    socialName: prop('socialName')
  })

export const buildFormValuesCustomer = applySpec({
  city: pathOr('', ['address', 'city']),
  complementary: pathOr('', ['address', 'complementary']),
  document: prop('document'),
  id: prop('id'),
  name: prop('name'),
  neighborhood: pathOr('', ['address', 'neighborhood']),
  phone: prop('phone'),
  reference: pathOr('', ['address', 'reference']),
  socialName: prop('socialName'),
  state: pathOr('', ['address', 'states']),
  street: pathOr('', ['address', 'street']),
  streetNumber: pathOr('', ['address', 'streetNumber']),
  zipcode: pathOr('', ['address', 'zipcode'])
})
