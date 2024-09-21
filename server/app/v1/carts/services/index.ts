
import { CartsAbstractService } from '~/server/app/v1/carts/services/carts.abstract-service'
import { CartsMagentoService } from '~/server/app/v1/carts/services/carts.magento.service'
import { CartsCommercetoolsService } from '~/server/app/v1/carts/services/carts.commercetools.service'

export const cartsServiceFactory = (): CartsAbstractService => {
  const serviceToUse = useRuntimeConfig().service

  switch (serviceToUse) {
    case 'magento':
      return new CartsMagentoService()
    case 'commercetools':
      return new CartsCommercetoolsService()
    default:
      return new CartsMagentoService()
  }
}
