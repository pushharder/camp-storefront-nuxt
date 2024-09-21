import type { Category } from '~/types/api/bff/v1/categories.types'
import type { CommercetoolsCategory } from '~/types/api/data/commercetools/categories.types'

export const mapCommercetoolsCategories = (commercetoolsCategories: CommercetoolsCategory[], root?: CommercetoolsCategory): Category => {
  const current: CommercetoolsCategory = root || commercetoolsCategories.find(category => category.parent === undefined)!
  const children: CommercetoolsCategory[] = commercetoolsCategories.filter(category => category.parent?.id === current.id)

  return {
    id: current.id,
    name: current.name['en-US'],
    slug: current.slug['en-US'],
    description: current.name['en-US'],
    parent: current.parent?.id ? { id: current.parent?.id } : null,
    children: children.length ? children.map(child => mapCommercetoolsCategories(commercetoolsCategories, child)) : [],
  }
}
