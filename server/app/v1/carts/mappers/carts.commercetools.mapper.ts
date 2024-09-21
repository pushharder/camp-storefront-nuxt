import type { Cart, CartLineItem } from '~/types/api/bff/v1/carts.types'
import type { CommercetoolsCart } from '~/types/api/data/commercetools/carts.types'

export const mapCommercetoolsCart = (cart: CommercetoolsCart): Cart => {
  return {
    id: cart.id,
    version: cart.version,
    customerId: cart.createdBy.clientId,
    lineItems: mapCommercetoolsCartLineItems(cart),
    totalPrice: {
      currencyCode: cart.totalPrice?.currencyCode || 'USD',
      centAmount: cart.totalPrice?.centAmount,
    },
    totalQuantity: cart.totalLineItemQuantity
  }
}

const mapCommercetoolsCartLineItems = (cart: CommercetoolsCart): CartLineItem[] => {
  return cart.lineItems.map(item => ({
    id: item.id,
    quantity: item.quantity,
    totalPrice: item.totalPrice.centAmount! / 100,
    currencyCode: item.totalPrice.currencyCode,
    details: {
      id: item.productId,
      name: item.name['en-US'],
      price: item.price.value.centAmount / 100,
      images: item.variant.images.map(image => image.url),
      sku: item.variant.sku
    }
  }))
}