import { defineStore } from 'pinia'
import type { ProductsGet200Response } from '~/types/interfaces'
import type { Category } from '~/types/api/bff/v1/categories.types'
import api from '~/api/api'
import ProductDTO from '~/DTO/Product'
import { MAX_PAGE_PRODUCTS_COUNT, START_PAGE_NUMBER } from '~/utils/constants'
import CategoryTree from '~/DTO/categories/CategoriesTree'
import type { AttributesResponse } from '~/types/api/bff/v1/attributes.types'
import ProductDetailsDTO from '~/DTO/ProductDetails'
import type { ProductDetails } from '~/types/api/bff/v1/product-details.types'

interface State {
  productsInfo: {
    total: number | null
    products: ProductDTO[]
  }
  selectedProduct: ProductDetailsDTO | null
  categoriesTree: CategoryTree | null
  selectedCategory: CategoryTree | null
  defaultCategoryId?: number | string
  attributes: AttributesResponse
  categoriesMocked: boolean
  productsMocked: boolean
  pdpIsMocked: boolean
}

export default defineStore('product', {
  state: (): State => ({
    productsInfo: {
      total: null,
      products: [],
    },
    selectedProduct: null,
    categoriesTree: null,
    selectedCategory: null,
    categoriesMocked: false,
    defaultCategoryId: 0,
    productsMocked: false,
    pdpIsMocked: false,
    attributes: {
      options: {
        color: [],
        size: []
      }
    }
  }),

  actions: {
    setActiveCategoryByPath(slugs: string[] = []): void {
      if (!this.categoriesTree) {
        return
      }

      const getSelectedCategory = (category: CategoryTree, slugs: string[]): CategoryTree | undefined => {
        const [left, ...right] = slugs

        let subTree
        if (left) {
          subTree = category.children?.find(({ id }) => id === left)
        }

        if (subTree && right.length) {
          return getSelectedCategory(subTree, right)
        }
        return subTree
      }

      this.selectedCategory = getSelectedCategory(this.categoriesTree, slugs) || this.categoriesTree
    },
    async getCategories(): Promise<void> {
        const { data } = await api<Category>({
          url: '/categories',
          method: 'get',
        })

        this.categoriesTree = new CategoryTree(data)
    },

    async getCategoryProducts(categoryID?: string | number, page?: number | string) {
      this.productsInfo.total = null

      const { data } = await api<ProductsGet200Response>({
        url: '/products',
        method: 'get',
        params: {
          categoryId: categoryID ?? this.defaultCategoryId,
          offset: page ?? START_PAGE_NUMBER,
          limit: MAX_PAGE_PRODUCTS_COUNT,
        },
      })

      this.productsInfo.total = data.total ?? null
      this.productsInfo.products = data.results?.map(product => new ProductDTO(product)) || []
    },

    async getProduct(sku: string) {
      this.selectedProduct = null
      const { data } = await api<ProductDetails>({
        url: '/products/$sku',
        method: 'get',
        pathParams: {
          $sku: sku,
        },
      })

      this.selectedProduct = new ProductDetailsDTO(data, this.attributes.options.color, this.attributes.options.size)
    },

    async getAttributes() {
      const { data } = await api<AttributesResponse>({
        url: '/attributes',
        method: 'get',
      })

      this.attributes = data
    }
  },
})
