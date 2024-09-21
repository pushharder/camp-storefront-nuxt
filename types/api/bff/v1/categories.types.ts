export type Category = {
  id: string
  name?: string
  slug?: string
  description?: string
  parent?: Category | null
  children?: Category[]
}
