import { H3Event } from 'h3'
import type { UpdateCartPayload } from '~/types/api/bff/v1/carts.types'
import { cartsServiceFactory } from '~/server/app/v1/carts/services'

export const createCartHandler = (_event: H3Event) => {
  return cartsServiceFactory().createCart()
}

export const getCartByIdHandler = (event: H3Event) => {
  const id = getRouterParam(event, 'id')

  return cartsServiceFactory().getCart(id as string)
}

export const updateCartHandler = async (event: H3Event) => {
  const cartId = getRouterParam(event, 'id')
  const body: UpdateCartPayload = await readBody(event)

  if (body.action === 'AddLineItem') {
    return cartsServiceFactory().addCartItem(cartId!, body)
  }

  if (body.action === 'ChangeLineItemQuantity') {
    return cartsServiceFactory().changeQuantity(cartId!, body)
  }

  if (body.action === 'RemoveLineItem') {
    return cartsServiceFactory().removeItem(cartId!, body)
  }

  if (body.action === 'SetShippingAddress') {
    return cartsServiceFactory().setShippingAddress(cartId!, body)
  }
}

export const placeOrderHandler = async (event: H3Event) => {
  const cartId = getRouterParam(event, 'id')
  const body: UpdateCartPayload = await readBody(event)

  return cartsServiceFactory().placeOrder(cartId!, body.version!)
}
