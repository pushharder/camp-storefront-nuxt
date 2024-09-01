import { H3Event } from 'h3'
import { getProductBySKU, getProductsByCategory } from '~/server/app/v1/products/products.service'

export const listProducts = (event: H3Event) => {
  const { limit, offset, categoryId } = getQuery(event)

  return getProductsByCategory(limit as number, offset as number, categoryId as string)
}

export const getProduct = (event: H3Event) => {
  const sku = getRouterParam(event, 'sku')

  if (sku) {
    return getProductBySKU(sku)
  }

  throw createError({
    statusCode: 403,
    statusMessage: 'SKU is not valid',
  })
}
