import type { AttributesResponse } from '~/types/api/bff/v1/attributes.types'
import { AttributesAbstractService } from '~/server/app/v1/attirbutes/services/attributes.abstract-service'

export class AttributesCommercetoolsService extends AttributesAbstractService {
  getAttributes(): Promise<AttributesResponse> {
    return Promise.resolve({
      options: {
        color: [],
        size: [],
      }
    })
  }
}
