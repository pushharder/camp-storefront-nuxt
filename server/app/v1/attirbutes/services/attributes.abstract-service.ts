import type { AttributesResponse } from '~/types/api/bff/v1/attributes.types'

export abstract class AttributesAbstractService {
  abstract getAttributes(): Promise<AttributesResponse>
}
