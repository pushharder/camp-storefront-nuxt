import { commercetoolsFetch } from '~/server/data/commercetools/fetch'
import type { CommercetoolsProductsResponse } from '~/types/api/data/commercetools/products.types'

export const getCommercetoolsProducts = (limit: number, offset: number, categoryId: string) =>
  commercetoolsFetch<CommercetoolsProductsResponse>('/product-projections/search', {
    method: 'GET',
    query: { limit, offset, filter: `categories.id:"${categoryId}"` },
  })

export const getCommercetoolsProductBySKU = (sku: string) =>
  commercetoolsFetch<CommercetoolsProductsResponse>('/product-projections/search', { method: 'GET', query: { filter: `variants.sku:"${sku}"` } })
