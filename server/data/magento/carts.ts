import { magentoFetch } from '~/server/data/magento/fetch'
import type {
  MagentoAddCartItemPayload,
  MagentoCart,
  MagentoCartLineItem,
  MagentoChangeCartItemQuantityPayload,
  MagentoEstimateShippingMethodPayload, MagentoPaymentMethod, MagentoPlaceOrderPayload,
  MagentoSetShippingAddressPayload,
  MagentoShippingMethod
} from '~/types/api/data/magento/carts.types'

export const createMagentoGuestCart = () => magentoFetch<string>('/V1/guest-carts', { method: 'POST' })

export const getMagentoCart = (id: string) => magentoFetch<MagentoCart>(`/V1/guest-carts/${id}`, { method: 'GET' })

export const getMagentoCartItems = (id: string) => magentoFetch<MagentoCartLineItem[]>(`/V1/guest-carts/${id}/items`, { method: 'GET' })

export const addMagentoCartItem = (id: string, payload: MagentoAddCartItemPayload) => magentoFetch<void>(`/V1/guest-carts/${id}/items`, { method: 'POST', body: payload })

export const changeMagentoCartQuantity = (id: string, itemId: string, payload: MagentoChangeCartItemQuantityPayload) => magentoFetch<void>(`/V1/guest-carts/${id}/items/${itemId}`, { method: 'PUT', body: payload })

export const removeMagentoCartItem = (id: string, itemId: string) => magentoFetch<void>(`/V1/guest-carts/${id}/items/${itemId}`, { method: 'DELETE' })

export const setMagentoShippingAddress = (id: string, payload: MagentoSetShippingAddressPayload) => magentoFetch<void>(`/V1/guest-carts/${id}/shipping-information`, { method: 'POST', body: payload })

export const setMagentoBillingAddress = (id: string, payload: MagentoEstimateShippingMethodPayload) => magentoFetch<MagentoShippingMethod[]>(`/V1/guest-carts/${id}/billing-address`, { method: 'POST', body: payload })

export const placeMagentoOrder = (id: string, payload: MagentoPlaceOrderPayload) => magentoFetch<void>(`/V1/guest-carts/${id}/order`, { method: 'PUT', body: payload })

export const estimateMagentoShippingAddress = (id: string, payload: MagentoEstimateShippingMethodPayload) => magentoFetch<MagentoShippingMethod[]>(`/V1/guest-carts/${id}/estimate-shipping-methods`, { method: 'POST', body: payload })

export const getMagentoPaymentMethods = (id: string) => magentoFetch<MagentoPaymentMethod[]>(`/V1/guest-carts/${id}/payment-methods`, { method: 'GET' })
