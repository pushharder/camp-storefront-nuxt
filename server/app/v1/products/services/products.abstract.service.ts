import type { ProductsResponse } from '~/types/api/bff/v1/products.types'
import type { ProductDetails } from '~/types/api/bff/v1/product-details.types'

export abstract class ProductsAbstractService {
  abstract getProductsByCategory(limit: number, offset: number, categoryId: string): Promise<ProductsResponse>
  abstract getProductBySKU(sku: string): Promise<ProductDetails>
}
