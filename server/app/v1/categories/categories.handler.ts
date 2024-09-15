import { H3Event } from 'h3'
import { getCategories } from '~/server/app/v1/categories/categories.service'

export const listCategories = (_event: H3Event) => getCategories()
