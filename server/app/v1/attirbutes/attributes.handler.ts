import { H3Event } from 'h3'
import { attributesServiceFactory } from '~/server/app/v1/attirbutes/services'

export const listAttributes = (_event: H3Event) => attributesServiceFactory().getAttributes()
