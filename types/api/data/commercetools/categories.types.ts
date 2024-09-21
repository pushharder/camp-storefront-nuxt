export interface CommercetoolsCategory {
  id: string
  key: string
  name: {
    'en-US': string
  }
  slug: {
    'en-US': string
  }
  parent?: CommercetoolsCategoryAncestor
}

export interface CommercetoolsCategoryAncestor {
  typeId: string
  id: string
}
