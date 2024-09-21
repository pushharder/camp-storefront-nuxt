import type {
  CommercetoolsProduct,
  CommercetoolsProductsResponse,
  CommercetoolsProductVariantAttribute
} from '~/types/api/data/commercetools/products.types'
import type { Product, ProductsResponse, ProductVariant } from '~/types/api/bff/v1/products.types'
import type { ProductDetails } from '~/types/api/bff/v1/product-details.types'

export const mapCommercetoolsProductsResponse = (commercetoolsProductsResponse: CommercetoolsProductsResponse): ProductsResponse => {
  return {
    limit: commercetoolsProductsResponse.limit,
    offset: commercetoolsProductsResponse.offset,
    total: commercetoolsProductsResponse.total,
    results: mapCommercetoolsProducts(commercetoolsProductsResponse.results),
  }
}

export const mapCommercetoolsProductDetailsResponse = (commercetoolsProduct: CommercetoolsProduct, sku: string): ProductDetails => {
  const variant = [commercetoolsProduct.masterVariant, ...commercetoolsProduct.variants].find(variant => variant.sku === sku)!
  const sizes = commercetoolsProduct.variants.map(variant => findAttributeByName(variant.attributes, 'Size'))
  const colors = commercetoolsProduct.variants.map(variant => findAttributeByName(variant.attributes, 'Color'))

  return {
    sku,
    id: commercetoolsProduct.id,
    name: commercetoolsProduct.name['en-US'],
    description: commercetoolsProduct.description['en-US'],
    price: variant.prices[0].value.centAmount / 100,
    images: variant.images.map(image => image.url),
    code: sku.split('-')[0],
    size: findAttributeByName(variant.attributes, 'Size'),
    color: findAttributeByName(variant.attributes, 'Color'),
    sizes: Array.from(new Set(sizes)),
    colors: Array.from(new Set(colors)),
  }
}

const mapCommercetoolsProducts = (commercetoolsProducts: CommercetoolsProduct[]): Product[] => {
  return commercetoolsProducts.map((ctProduct) => {
    return {
      id: ctProduct.id,
      name: ctProduct.name['en-US'],
      description: ctProduct.description['en-US'],
      slug: ctProduct.slug['en-US'],
      masterVariant: mapCommercetoolsProductVariant(ctProduct)
    }
  })
}

const mapCommercetoolsProductVariant = (commercetoolsProduct: CommercetoolsProduct): ProductVariant => ({
  id: commercetoolsProduct.masterVariant.id.toString(),
  sku: commercetoolsProduct.masterVariant.sku,
  name: commercetoolsProduct.name['en-US'],
  slug: commercetoolsProduct.slug['en-US'],
  images: commercetoolsProduct.masterVariant.images,
  prices: commercetoolsProduct.masterVariant.prices,
})

const findAttributeByName = (attributes: CommercetoolsProductVariantAttribute[], name: 'Size' | 'Color'): string =>
  attributes.find(attr => attr.name === name)?.value.key!
