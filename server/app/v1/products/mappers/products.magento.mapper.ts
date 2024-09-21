import type { MagentoProduct } from '~/types/api/data/magento/products.types'
import type { Product, ProductVariant } from '~/types/api/bff/v1/products.types'
import type { MagentoProductDetails, MagentoProductVariantDetails } from '~/types/api/data/magento/product-details.types'
import type { ProductDetails } from '~/types/api/bff/v1/product-details.types'

export type ProductWithVariants = MagentoProduct & {variants: MagentoProduct[]}

const MAGENTO_MEDIA_URL = 'https://magento.sandbox.epamdev.com/media/catalog/product'

export const mapMagentoProducts = (magentoProducts: ProductWithVariants[]): Product[] => {
  return magentoProducts.map(mapMagentoProduct)
}

export const mapMagentoProduct = (magentoProduct: ProductWithVariants): Product => {
  const variants = magentoProduct.variants.map(mapProductVariant)
  return {
    id: magentoProduct?.id?.toString(),
    name: magentoProduct.name,
    description: magentoProduct?.custom_attributes?.find(
      attr => attr.attribute_code === 'description'
    )?.value,
    slug: magentoProduct?.custom_attributes?.find(
      attr => attr.attribute_code === 'url_key'
    )?.value,
    variants,
    masterVariant: variants[0]
  }
}

export const mapMagentoProductDetails = (productVariantDetails: MagentoProductVariantDetails, productDetails: MagentoProductDetails): ProductDetails => {
  const sizesOption = productDetails.extension_attributes?.configurable_product_options.find(attr => attr.attribute_id === '144')
  const colorsOption = productDetails.extension_attributes?.configurable_product_options.find(attr => attr.attribute_id === '93')

  return {
    id: productVariantDetails.id.toString(),
    name: productVariantDetails.name,
    description: productVariantDetails.custom_attributes?.find(attr => attr.attribute_code === 'description')?.value || '',
    price: productVariantDetails.price,
    sku: productVariantDetails.sku,
    code: productDetails.sku,
    size: productVariantDetails.custom_attributes?.find(attr => attr.attribute_code === 'size')?.value || '',
    color: productVariantDetails.custom_attributes?.find(attr => attr.attribute_code === 'color')?.value || '',
    images: productVariantDetails.media_gallery_entries?.reduce((acc, entry) => {
      if (entry.media_type === 'image' && entry.file) {
        acc.push(MAGENTO_MEDIA_URL + entry.file)

        return acc
      }

      return acc
    }, [] as string[]) || [],
    sizes: sizesOption ? sizesOption.values.map(val => val.value_index.toString()) : [],
    colors: colorsOption ? colorsOption.values.map(val => val.value_index.toString()) : [],
  }
}

const mapProductVariant = (magentoProduct: MagentoProduct): ProductVariant => {
  return {
    id: magentoProduct?.id?.toString(),
    sku: magentoProduct.sku,
    prices: [
      { value: { currencyCode: 'USD', centAmount: magentoProduct?.price ? magentoProduct?.price * 100 : 0 } },
    ],
    images: [
      {
        url: MAGENTO_MEDIA_URL + magentoProduct?.custom_attributes?.find(
          attr => attr.attribute_code === 'image'
        )?.value,
      },
    ],
    attributes: [
      {
        color: magentoProduct?.custom_attributes?.find(
          attr => attr.attribute_code === 'color'
        )?.value,
        size: magentoProduct?.custom_attributes?.find(
          attr => attr.attribute_code === 'size'
        )?.value,
      },
    ],
    slug: magentoProduct.custom_attributes?.find(
      attr => attr.attribute_code === 'url_key'
    )?.value,
  }
}
