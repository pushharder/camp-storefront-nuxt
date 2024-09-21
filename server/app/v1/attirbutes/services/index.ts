import { AttributesAbstractService } from '~/server/app/v1/attirbutes/services/attributes.abstract-service'
import { MagentoAttributesService } from '~/server/app/v1/attirbutes/services/attributes.magento.service'
import { AttributesCommercetoolsService } from '~/server/app/v1/attirbutes/services/attributes.commercetools.service'

export const attributesServiceFactory = (): AttributesAbstractService => {
  const serviceToUse = useRuntimeConfig().service

  switch (serviceToUse) {
    case 'magento':
      return new MagentoAttributesService()
    case 'commercetools':
      return new AttributesCommercetoolsService()
    default:
      return new MagentoAttributesService()
  }
}
