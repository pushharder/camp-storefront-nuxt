import { defineStore } from 'pinia'
import api from '~/api/api'
import type { Address, CartLineItemsInner } from '~/types/interfaces'
import { getStorage } from '~/utils/localStorage'
import * as mockedCart from '~/utils/mockedCartApi'
import type { Cart } from '~/types/api/bff/v1/carts.types'

interface State {
    cart: Cart;
    cartId: string;
    address?: Address;
    orderId?: string;
}

export default defineStore('cart', {
    state: (): State => ({
        cart: {
            lineItems: [],
            version: 0,
        },
        cartId: '',
    }),
    actions: {
        loadCart(): void {
            const cartId = JSON.parse(getStorage().getItem('camp_cart') as string)
            if (cartId) {
                this.loadById(cartId)
            } else {
                this.createNewCart()
            }
        },
        async createNewCart(): Promise<void> {
            try {
                const response = await api<string>({
                    url: '/carts',
                    method: 'post'
                })
                this.cacheCart(response.data)
                this.loadCart()
            } catch (error) {
                console.info('Error creating a new cart. Falling back to mocked cart')
            }
        },
        async loadById(id: string): Promise<void> {
            try {
                const response = await api<Cart>({
                    url: `/carts/${id}`,
                    method: 'get'
                })

                this.cart = response.data
            } catch (error) {
                console.error(error)

                console.info('Error loading cart. Falling back to mocked cart')
            }
        },
        async addProductToCart(productSKU: string, productId: string, quantity: number): Promise<void> {
            try {
                await api<Cart>({
                    url: `/carts/${this.cart.id}`,
                    method: 'put',
                    data: {
                        version: this.cart.version,
                        action: 'AddLineItem',
                        AddLineItem: {
                            variantId: productSKU,
                            productId: productId,
                            quantity
                        }
                    }
                })

                // to do - add line item to cart
                // this.cacheCart()
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error adding product to cart. Falling back to mocked cart')
                // mockedCart.addProductToCart(productSKU, quantity)
            }

            await this.loadById(this.cart.id as string)
        },
        async updateQuantity(lineItem: CartLineItemsInner, quantity: number): Promise<void> {
            try {
                await api<Cart>({
                    url: `/carts/${this.cart.id}`,
                    method: 'put',
                    data: {
                        version: this.cart.version,
                        action: 'ChangeLineItemQuantity',
                        ChangeLineItemQuantity: {
                            lineItemId: lineItem.id,
                            quantity
                        }
                    }
                })

                // to do - add line item to cart
                // this.cacheCart()
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error updating quantity. Falling back to mocked cart')
                mockedCart.changeQuantity(lineItem, quantity)
            }

            await this.loadById(this.cart.id as string)
        },
        async removeLineItem(lineItem: CartLineItemsInner): Promise<void> {
            try {
                await api<Cart>({
                    url: `/carts/${this.cart.id}`,
                    method: 'put',
                    data: {
                        version: this.cart.version,
                        action: 'RemoveLineItem',
                        RemoveLineItem: {
                            lineItemId: lineItem.id,
                            quantity: lineItem.quantity
                        }
                    }
                })

                // to do - add line item to cart
                // this.cacheCart()
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error removing line item. Falling back to mocked cart')
                mockedCart.removeProductFromCart(lineItem.variant?.sku as string)
            }

            await this.loadById(this.cart.id as string)
        },

        async setAddress(address: Address): Promise<void> {
            try {
                await api<Cart>({
                    url: `/carts/${this.cart.id}`,
                    method: 'put',
                    data: {
                        version: this.cart.version,
                        action: 'SetShippingAddress',
                        SetShippingAddress: address
                    }
                })

                await this.loadById(this.cart.id as string)
                // to do - add line item to cart
                this.cacheCart(this.cart.id as string)

                this.address = address
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error setting address. Falling back to mocked cart')
                this.address = address
            }
        },

        async placeOrder(): Promise<void> {
            try {
                const order = await api<Cart>({
                    url: `/carts/${this.cart.id}/order`,
                    method: 'post',
                    data: {
                        version: this.cart.version,
                    }
                })

                this.orderId = order.data.id
            } catch (error) {
                // TBD, make a error message
                // Throw a error message
                console.error(error)

                console.info('Error placing order. Falling back to mocked cart')

                this.orderId = 'mocked-order-id'
                mockedCart.clearCart()
            }

            this.clearCart()
        },

        cacheCart(cartId: string): void {
            getStorage().setItem('camp_cart', JSON.stringify(cartId))
        },

        clearCart(): void {
            getStorage().removeItem('camp_cart')
        }
    },
})
