import { H3Event } from 'h3'
import { getAttributes } from '~/server/app/v1/attirbutes/attributes.service'

export const listAttributes = (_event: H3Event) => {
  return getAttributes()
}
