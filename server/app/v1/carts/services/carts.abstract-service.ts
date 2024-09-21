import type { Cart, UpdateCartPayload } from '~/types/api/bff/v1/carts.types'

export abstract class CartsAbstractService {
  abstract createCart(): Promise<string>
  abstract getCart(id: string): Promise<Cart>
  abstract addCartItem(cartId: string, item: UpdateCartPayload): Promise<void>
  abstract changeQuantity(cartId: string, item: UpdateCartPayload): Promise<void>
  abstract removeItem(cartId: string, item: UpdateCartPayload): Promise<void>
  abstract setShippingAddress(cartId: string, item: UpdateCartPayload): Promise<void>
  abstract placeOrder(cartId: string, version: number): Promise<void>
}
