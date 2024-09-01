export type MagentoAttributesResponse = {
  options: MagentoAttribute[]
}

export enum MagentoAvailableAttributes {
  COLOR = 'color',
  SIZE = 'size',
}

export type MagentoAttribute = {
  label: string
  value: string
}
