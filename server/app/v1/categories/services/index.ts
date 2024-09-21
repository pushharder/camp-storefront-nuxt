import { CategoriesAbstractService } from '~/server/app/v1/categories/services/categories.abstract-service'
import { CategoriesMagentoService } from '~/server/app/v1/categories/services/categories.magento.service'
import { CategoriesCommercetoolsService } from '~/server/app/v1/categories/services/categories.commercetools.service'

export const categoriesServiceFactory = (): CategoriesAbstractService => {
  const serviceToUse = useRuntimeConfig().service

  switch (serviceToUse) {
    case 'magento':
      return new CategoriesMagentoService()
    case 'commercetools':
      return new CategoriesCommercetoolsService()
    default:
      return new CategoriesMagentoService()
  }
}
