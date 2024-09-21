import type {
  CommercetoolsProductVariant,
  CommercetoolsProductVariantPrice
} from '~/types/api/data/commercetools/products.types'

export interface CommercetoolsCart {
  id: string
  version: number
  createdBy: {
    clientId: string
  }
  lineItems: CommercetoolsCartLineItem[]
  totalPrice?: CommercetoolsCartTotalPrice
  totalLineItemQuantity: number
}

export interface CommercetoolsAddCartItemPayload {
  version: number,
  actions: {
    action: 'addLineItem'
    productId: string
    variantId: number
    quantity: number
  }[]
}

export interface CommercetoolsRemoveCartItemPayload {
  version: number,
  actions: {
    action: 'removeLineItem'
    lineItemId: string
  }[]
}

export interface CommercetoolsCartItemChangeQuantityPayload {
  version: number,
  actions: {
    action: 'changeLineItemQuantity'
    lineItemId: string
    quantity: number
  }[]
}

export interface CommercetoolsCartSetShippingAddressPayload {
  version: number,
  actions: {
    action: 'setShippingAddress'
    address: {
      firstName: string
      lastName: string
      email: string
      country: string
      city: string
      postalCode: string
      region: string
      streetName: string
      streetNumber: string
    }
  }[]
}

export interface CommercetoolsPlaceOrderPayload {
    version: number,
    cart: {
      id: string,
      typeId: 'cart'
    }
}

export interface CommercetoolsCartLineItem {
  id: string
  productId: string
  productKey: string
  name: {
    'en-US': string
  }
  variant: CommercetoolsProductVariant
  price: CommercetoolsProductVariantPrice,
  quantity: number
  totalPrice: CommercetoolsCartTotalPrice
}

interface CommercetoolsCartTotalPrice {
  currencyCode?: string
  centAmount?: number
}
