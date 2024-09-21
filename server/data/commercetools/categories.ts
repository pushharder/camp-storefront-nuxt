import { commercetoolsFetch } from '~/server/data/commercetools/fetch'
import type { CommercetoolsCategory } from '~/types/api/data/commercetools/categories.types'

export const getCommercetoolsCategories = () =>
  commercetoolsFetch<{ results: CommercetoolsCategory[] }>('/categories', { method: 'GET' })
