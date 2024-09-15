import { magentoFetch } from '~/server/data/magento/fetch'
import { type MagentoAttributesResponse, MagentoAvailableAttributes } from '~/types/api/data/magento/attributes.types'

export const getMagentoAttributes = (attribute: MagentoAvailableAttributes) => {
  return magentoFetch<MagentoAttributesResponse>(`/V1/products/attributes/${attribute}`, {
    method: 'GET',
  })
}
