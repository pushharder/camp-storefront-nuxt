import { type ProductDetails } from '~/types/api/bff/v1/product-details.types'

export interface Cart {
  id?: string
  version?: number
  customerId?: string
  lineItems?: CartLineItem[]
  totalPrice?: CartTotalPrice
  totalQuantity?: number
}

export interface CartLineItem {
  id?: string
  details?: ProductDetails
  quantity?: number
  totalPrice?: number
  currencyCode?: string
}

export interface CartTotalPrice {
  currencyCode?: string
  centAmount?: number
}

export type UpdateCartPayload = {
  version?: number
  action: UpdateCartAvailableActionTypes,
  AddLineItem?: AddToCartAction
  RemoveLineItem?: UpdateCartAction
  ChangeLineItemQuantity?: UpdateCartAction
  SetShippingAddress?: SetShippingAddressAction
}

export interface UpdateCartAction {
  lineItemId: number
  quantity: number
}

export interface AddToCartAction {
  variantId: string
  productId: string
  quantity: number
}

export interface SetShippingAddressAction {
  country: string
  firstName: string
  lastName: string
  streetName: string
  streetNumber: string
  postalCode: string
  city: string
  region: string
  email: string
}

export type UpdateCartAvailableActionTypes = 'AddLineItem' | 'RemoveLineItem' | 'ChangeLineItemQuantity' | 'SetShippingAddress'
