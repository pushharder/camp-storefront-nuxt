import type { MagentoMediaGallery } from '~/types/api/data/magento/products.types'

export type MagentoProductVariantDetails = {
  id: number
  name: string
  price: number
  description: string
  sku: string
  custom_attributes?: MagentoCustomAttribute[]
  media_gallery_entries?: MagentoMediaGallery[]
}

export type MagentoProductDetails = {
  sku: string
  extension_attributes?: MagentoExtensionAttributes
}

export type MagentoCustomAttribute = {
  attribute_code: string
  value: string
}

export type MagentoExtensionAttributes = {
  configurable_product_options: ConfigurableProductOption[]
}

export type ConfigurableProductOption = {
  attribute_id: string
  label: string
  values: { value_index: number }[]
}
