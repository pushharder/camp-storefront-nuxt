import { variant } from 'postcss-minify-font-values/types/lib/keywords'
import {
  addMagentoCartItem, changeMagentoCartQuantity,
  createMagentoGuestCart,
  getMagentoCart,
  getMagentoCartItems, removeMagentoCartItem
} from '~/server/data/magento/carts'
import { mapMagentoCart } from '~/server/app/v1/carts/carts.mapper'
import { UpdateCartPayload } from '~/types/api/bff/v1/carts.types'
import { getMagentoProductBySKU } from '~/server/data/magento/products'
import { MagentoProductVariantDetails } from '~/types/api/data/magento/product-details.types'
import { getProductBySKU } from '~/server/app/v1/products/products.service'
import { ProductDetails } from '~/types/api/bff/v1/product-details.types'

export const createCart = () => createMagentoGuestCart()

export const getCart = async (id: string) => {
  const [cart, items] = await Promise.all([getMagentoCart(id), getMagentoCartItems(id)])

  let details: ProductDetails[] = []

  if (items.length) {
    details = await Promise.all(items.map(async (item) => {
      return await getProductBySKU(item.sku)
    }))
  }
  console.log(details)

  return mapMagentoCart(id, cart, items, details)
}

export const addCartItem = (cartId: string, item: UpdateCartPayload) =>
  addMagentoCartItem(cartId, {
    cartItem: {
      qty: item.AddLineItem!.quantity,
      sku: item.AddLineItem!.variantId,
      quote_id: item.AddLineItem!.variantId
    }
  })

export const changeQuantity = (cartId: string, item: UpdateCartPayload) =>
  // eslint-disable-next-line
  changeMagentoCartQuantity(cartId, item.ChangeLineItemQuantity?.lineItemId?.toString()!, {
    cartItem: {
      qty: item.ChangeLineItemQuantity!.quantity,
      quote_id: cartId
    }
  })

export const removeItem = (cartId: string, item: UpdateCartPayload) =>
  // eslint-disable-next-line
  removeMagentoCartItem(cartId, item.RemoveLineItem?.lineItemId?.toString()!)
