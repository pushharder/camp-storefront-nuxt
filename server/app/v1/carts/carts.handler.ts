import { H3Event } from 'h3'
import { addCartItem, changeQuantity, createCart, getCart, removeItem } from '~/server/app/v1/carts/carts.service'
import { UpdateCartPayload } from '~/types/api/bff/v1/carts.types'

export const createCartHandler = (_event: H3Event) => {
  return createCart()
}

export const getCartByIdHandler = (event: H3Event) => {
  const id = getRouterParam(event, 'id')

  return getCart(id as string)
}

export const updateCartHandler = async (event: H3Event) => {
  const cartId = getRouterParam(event, 'id')
  const body: UpdateCartPayload = await readBody(event)

  if (body.action === 'AddLineItem') {
    return addCartItem(cartId!, body)
  }

  if (body.action === 'ChangeLineItemQuantity') {
    return changeQuantity(cartId!, body)
  }

  if (body.action === 'RemoveLineItem') {
    return removeItem(cartId!, body)
  }
}
