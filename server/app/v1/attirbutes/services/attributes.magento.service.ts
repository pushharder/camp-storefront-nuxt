import { getMagentoAttributes } from '~/server/data/magento/attributes'
import { MagentoAvailableAttributes } from '~/types/api/data/magento/attributes.types'
import type { AttributesResponse } from '~/types/api/bff/v1/attributes.types'
import { AttributesAbstractService } from '~/server/app/v1/attirbutes/services/attributes.abstract-service'

export class MagentoAttributesService extends AttributesAbstractService {
  async getAttributes(): Promise<AttributesResponse> {
    const attributes = await Promise.all([getMagentoAttributes(MagentoAvailableAttributes.COLOR), getMagentoAttributes(MagentoAvailableAttributes.SIZE)])

    return {
      options: {
        color: attributes[0].options,
        size: attributes[1].options,
      }
    }
  }
}
