export type ProductAttribute = { value: string, label?: string }

export default class ProductDetailsAttributeDTO {
  value: string
  label: string

  constructor(attribute: ProductAttribute) {
    this.value = attribute.value || ''
    this.label = attribute.label || ''
  }
}
