import type { Category } from '~/types/api/bff/v1/categories.types'

export abstract class CategoriesAbstractService {
  abstract getCategories(): Promise<Category>
}
