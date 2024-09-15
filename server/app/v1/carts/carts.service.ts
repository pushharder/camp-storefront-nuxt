import {
  addMagentoCartItem,
  changeMagentoCartQuantity,
  createMagentoGuestCart,
  estimateMagentoShippingAddress,
  getMagentoCart,
  getMagentoCartItems,
  getMagentoPaymentMethods,
  placeMagentoOrder,
  removeMagentoCartItem, setMagentoBillingAddress,
  setMagentoShippingAddress
} from '~/server/data/magento/carts'
import { mapMagentoCart } from '~/server/app/v1/carts/carts.mapper'
import type { UpdateCartPayload } from '~/types/api/bff/v1/carts.types'
import { getProductBySKU } from '~/server/app/v1/products/products.service'
import type { ProductDetails } from '~/types/api/bff/v1/product-details.types'
import type { MagentoPlaceOrderPayload, MagentoSetShippingAddressPayload } from '~/types/api/data/magento/carts.types'

export const createCart = () => createMagentoGuestCart()

export const getCart = async (id: string) => {
  const [cart, items] = await Promise.all([getMagentoCart(id), getMagentoCartItems(id)])

  let details: ProductDetails[] = []

  if (items.length) {
    details = await Promise.all(items.map(async (item) => {
      return await getProductBySKU(item.sku)
    }))
  }

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

export const setShippingAddress = async (cartId: string, item: UpdateCartPayload) => {
  const action = item.SetShippingAddress!
  const address = {
    city: action.city,
    country_id: action.country,
    email: action.email,
    firstname: action.firstName,
    lastname: action.lastName,
    postcode: action.postalCode,
    region: action.region,
    region_code: action.region,
    street: [action.streetName, action.streetNumber],
    telephone: '111111111'
  }

  const methods = await estimateMagentoShippingAddress(cartId, { address })

  const shippingAddressPayload: MagentoSetShippingAddressPayload = {
    addressInformation: {
      shipping_address: address,
      shipping_carrier_code: methods[0].carrier_code,
      shipping_method_code: methods[0].method_code,
    }
  }

    await setMagentoShippingAddress(cartId, shippingAddressPayload)
    await setMagentoBillingAddress(cartId, { address })
}

export const placeOrder = async (cartId: string) => {
  const paymentMethods = await getMagentoPaymentMethods(cartId)

  const placeOrderPayload: MagentoPlaceOrderPayload = {
    paymentMethod: {
      method: paymentMethods[0].code,
    }
  }

    return await placeMagentoOrder(cartId, placeOrderPayload)
}
