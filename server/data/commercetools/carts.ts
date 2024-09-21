import { commercetoolsFetch } from '~/server/data/commercetools/fetch'
import type {
  CommercetoolsAddCartItemPayload,
  CommercetoolsCart,
  CommercetoolsCartItemChangeQuantityPayload,
  CommercetoolsCartSetShippingAddressPayload,
  CommercetoolsPlaceOrderPayload,
  CommercetoolsRemoveCartItemPayload
} from '~/types/api/data/commercetools/carts.types'

export const createCommercetoolsCart = () =>
  commercetoolsFetch<CommercetoolsCart>('/carts', { method: 'POST', body: { currency: 'USD' } })

export const getCommercetoolsCart = (id: string) =>
  commercetoolsFetch<CommercetoolsCart>(`/carts/${id}`, { method: 'GET' })

export const addCommercetoolsCartItem = (id: string, payload: CommercetoolsAddCartItemPayload) =>
  commercetoolsFetch<CommercetoolsCart>(`/carts/${id}`, { method: 'POST', body: payload })

export const removeCommercetoolsCartItem = (id: string, payload: CommercetoolsRemoveCartItemPayload) =>
  commercetoolsFetch<void>(`/carts/${id}`, { method: 'POST', body: payload })

export const changeCommercetoolsCartItemQuantity = (id: string, payload: CommercetoolsCartItemChangeQuantityPayload) =>
  commercetoolsFetch<void>(`/carts/${id}`, { method: 'POST', body: payload })

export const setCommercetoolsShippingAddress = (id: string, payload: CommercetoolsCartSetShippingAddressPayload) =>
  commercetoolsFetch<void>(`/carts/${id}`, { method: 'POST', body: payload })

export const placeCommercetoolsOrder = (payload: CommercetoolsPlaceOrderPayload) =>
  commercetoolsFetch<void>(`/orders`, { method: 'POST', body: payload })
