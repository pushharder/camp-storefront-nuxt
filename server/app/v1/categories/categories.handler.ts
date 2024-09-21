import { H3Event } from 'h3'
import { categoriesServiceFactory } from '~/server/app/v1/categories/services'

export const listCategories = (_event: H3Event) => categoriesServiceFactory().getCategories()
