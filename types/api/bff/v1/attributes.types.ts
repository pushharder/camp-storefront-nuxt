export type AttributesResponse = {
  options: Record<AvailableAttributes, Attribute[]>;
}

export enum AvailableAttributes {
  COLOR = 'color',
  SIZE = 'size',
}

export type Attribute = {
  label: string
  value: string
}
