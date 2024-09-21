import { getMagentoCategories } from '~/server/data/magento/categories'
import { mapMagentoCategories } from '~/server/app/v1/categories/mappers/categories.magento.mapper'
import type { Category } from '~/types/api/bff/v1/categories.types'
import { CategoriesAbstractService } from '~/server/app/v1/categories/services/categories.abstract-service'

export class CategoriesMagentoService extends CategoriesAbstractService {
  async getCategories(): Promise<Category> {
    const magentoCategories = await getMagentoCategories()

    return mapMagentoCategories(magentoCategories)
  }
}
