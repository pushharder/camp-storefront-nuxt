import qs from 'qs'
import { magentoFetch } from '~/server/data/magento/fetch'
import type { MagentoProductsResponse } from '~/types/api/data/magento/products.types'
import type {
  MagentoProductDetails,
  MagentoProductVariantDetails
} from '~/types/api/data/magento/product-details.types'

export const getMagentoProducts = (limit: number, offset: number, categoryId: string) => {
  const params = {
    search_criteria: {
      filter_groups: [
        {
          filters: [
            {
              field: 'type_id',
              value: 'configurable',
              condition_type: 'eq',
            },
            {
              field: 'category_id',
              value: categoryId,
              condition_type: 'in',
            },
          ],
        },
      ],
      page_size: limit,
      current_page: offset,
    },
  }

  return magentoFetch<MagentoProductsResponse>(`/V1/products?${qs.stringify(params)}`, { method: 'GET' })
}

export const getMagentoProductBySKU = (sku: string) => {
  return magentoFetch<MagentoProductVariantDetails>(`/V1/products/${sku}`, { method: 'GET' })
}

export const getMagentoProductByCode = (code: string) => {
  return magentoFetch<MagentoProductDetails>(`/V1/products/${code}`, { method: 'GET' })
}

export const getMagentoVariants = (ids: string[]) => {
  const params = {
    search_criteria: {
      filter_groups: [
        {
          filters: [
            {
              field: 'entity_id',
              value:
                ids.join(
                  ','
                ),
              condition_type: 'in',
            },
          ],
        },
      ],
    },
  }

  return magentoFetch<MagentoProductsResponse>(`/V1/products?${qs.stringify(params)}`, { method: 'GET' })
}
