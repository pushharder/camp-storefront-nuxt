import type { ProductDetails } from '~/types/api/bff/v1/product-details.types'
import type { Attribute } from '~/types/api/bff/v1/attributes.types'
import ImageDTO from '~/DTO/Image'
import ProductDetailsAttributeDTO from '~/DTO/ProductDetailsAttribute'

export default class ProductDetailsDTO {
  id: string
  name: string
  description: string
  price: number
  sku: string
  code: string
  images: ImageDTO[]
  size: ProductDetailsAttributeDTO
  color: ProductDetailsAttributeDTO
  sizes: ProductDetailsAttributeDTO[]
  colors: ProductDetailsAttributeDTO[]

  constructor(product: ProductDetails, colors: Attribute[], sizes: Attribute[] ) {
    this.id = product.id.toString()
    this.name = product.name
    this.description = product.description || ''
    this.price = product.price
    this.sku = product.sku
    this.code = product.code
    this.images = product.images.map(image => new ImageDTO({ url: image, label: '' }))
    this.size = new ProductDetailsAttributeDTO({ value: product.size, label: sizes.find(size => size.value === product.size)?.label })
    this.color = new ProductDetailsAttributeDTO({ value: product.color, label: colors.find(color => color.value === product.color)?.label })
    this.sizes = product.sizes.map(productSize => new ProductDetailsAttributeDTO({ value: productSize.toString(), label: sizes.find(size => size.value === productSize.toString())?.label }))
    this.colors = product.colors.map(productColor => new ProductDetailsAttributeDTO({ value: productColor.toString(), label: colors.find(color => color.value === productColor.toString())?.label }))
  }
}
