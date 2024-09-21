import { ProductsAbstractService } from '~/server/app/v1/products/services/products.abstract.service'
import { ProductsMagentoService } from '~/server/app/v1/products/services/products.magento.service'
import { ProductsCommercetoolsService } from '~/server/app/v1/products/services/products.commercetools.service'

export const productsServiceFactory = (): ProductsAbstractService => {
  const serviceToUse = useRuntimeConfig().service

  switch (serviceToUse) {
    case 'magento':
      return new ProductsMagentoService()
    case 'commercetools':
      return new ProductsCommercetoolsService()
    default:
      return new ProductsMagentoService()
  }
}
