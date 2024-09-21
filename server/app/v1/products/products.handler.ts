import { H3Event } from 'h3'
import { productsServiceFactory } from '~/server/app/v1/products/services'

export const listProducts = (event: H3Event) => {
  const { limit, offset, categoryId } = getQuery(event)

  return productsServiceFactory().getProductsByCategory(limit as number, offset as number, categoryId as string)
}

export const getProduct = (event: H3Event) => {
  const sku = getRouterParam(event, 'sku')

  if (sku) {
    return productsServiceFactory().getProductBySKU(sku)
  }

  throw createError({
    statusCode: 403,
    statusMessage: 'SKU is not valid',
  })
}
