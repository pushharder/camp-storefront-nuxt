export interface CommercetoolsProductsResponse {
  limit: number
  offset: number
  total: number
  results: CommercetoolsProduct[]
}

export interface CommercetoolsProduct{
  id: string
  name: {
    'en-US': string
  }
  description: {
    'en-US': string
  }
  slug: {
    'en-US': string
  }
  masterVariant: CommercetoolsProductVariant
  variants: CommercetoolsProductVariant[]
}

export interface CommercetoolsProductVariant {
  id: number
  key: string
  sku: string
  prices: CommercetoolsProductVariantPrice[],
  images: CommercetoolsProductVariantImage[],
  attributes: CommercetoolsProductVariantAttribute[]
}

export interface CommercetoolsProductVariantPrice {
  id: string
  value: {
    type: 'string'
    currencyCode: string
    centAmount: number
  }
}

export interface CommercetoolsProductVariantImage {
  url: string
}

export interface CommercetoolsProductVariantAttribute {
  name: 'Color' | 'Size',
  value: {
    key: string,
    label: string
  }
}
