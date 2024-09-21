import type { Category } from '~/types/api/bff/v1/categories.types'
import { CategoriesAbstractService } from '~/server/app/v1/categories/services/categories.abstract-service'
import { getCommercetoolsCategories } from '~/server/data/commercetools/categories'
import { mapCommercetoolsCategories } from '~/server/app/v1/categories/mappers/categories.commercetools.mapper'

export class CategoriesCommercetoolsService extends CategoriesAbstractService {
  async getCategories(): Promise<Category> {
    const categories = await getCommercetoolsCategories()

    return mapCommercetoolsCategories(categories.results)
  }
}
