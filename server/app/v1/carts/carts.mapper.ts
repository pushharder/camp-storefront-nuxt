import { type Cart, CartLineItem } from '~/types/api/bff/v1/carts.types'
import { ProductDetails } from '~/types/api/bff/v1/product-details.types'
import type { MagentoCart, MagentoCartLineItem } from '~/types/api/data/magento/carts.types'

export const mapMagentoCart = (id: string, cart: MagentoCart, items: MagentoCartLineItem[], details: ProductDetails[]): Cart => {
  return {
    id,
    version: 0,
    customerId: '',
    lineItems: mapMagentoCartLineItems(items, details, cart),
    totalPrice: {
      currencyCode: cart.currency.store_currency_code || 'USD',
      centAmount: items.reduce((acc, item) => {
        acc += item.price * item.qty
        return acc
      }, 0) * 100
    },
    totalQuantity: cart.items_qty
  }
}

const mapMagentoCartLineItems = (items: MagentoCartLineItem[], details: ProductDetails[], cart: MagentoCart): CartLineItem[] =>
items.map(item => ({
    id: item.item_id.toString(),
    details: details.find(detail => detail.sku === item.sku),
    quantity: item.qty,
    totalPrice: item.price * item.qty,
    currencyCode: cart.currency.store_currency_code || 'USD',
  }))
