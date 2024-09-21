import { ProductsAbstractService } from '~/server/app/v1/products/services/products.abstract.service'
import type { ProductsResponse } from '~/types/api/bff/v1/products.types'
import type { ProductDetails } from '~/types/api/bff/v1/product-details.types'
import { getCommercetoolsProductBySKU, getCommercetoolsProducts } from '~/server/data/commercetools/products'
import {
  mapCommercetoolsProductDetailsResponse,
  mapCommercetoolsProductsResponse
} from '~/server/app/v1/products/mappers/products.commercetools.mapper'

export class ProductsCommercetoolsService extends ProductsAbstractService {
  async getProductsByCategory(
    limit: number,
    offset: number,
    categoryId: string,
  ): Promise<ProductsResponse> {
    const response =  await getCommercetoolsProducts(limit, offset, categoryId)

    return mapCommercetoolsProductsResponse(response)
  }

  async getProductBySKU(sku: string): Promise<ProductDetails> {
    const response =  await getCommercetoolsProductBySKU(sku)

    return mapCommercetoolsProductDetailsResponse(response.results[0], sku)
  }
}
