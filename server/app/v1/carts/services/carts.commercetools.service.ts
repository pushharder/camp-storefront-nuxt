import { CartsAbstractService } from '~/server/app/v1/carts/services/carts.abstract-service'
import {
  addMagentoCartItem,
  changeMagentoCartQuantity,
  createMagentoGuestCart,
  estimateMagentoShippingAddress,
  getMagentoCart,
  getMagentoCartItems,
  getMagentoPaymentMethods, placeMagentoOrder,
  removeMagentoCartItem,
  setMagentoBillingAddress,
  setMagentoShippingAddress
} from '~/server/data/magento/carts'
import type { ProductDetails } from '~/types/api/bff/v1/product-details.types'
import { productsServiceFactory } from '~/server/app/v1/products/services'
import { mapMagentoCart } from '~/server/app/v1/carts/mappers/carts.magento.mapper'
import type { UpdateCartPayload } from '~/types/api/bff/v1/carts.types'
import type { MagentoPlaceOrderPayload, MagentoSetShippingAddressPayload } from '~/types/api/data/magento/carts.types'
import {
  addCommercetoolsCartItem, changeCommercetoolsCartItemQuantity,
  createCommercetoolsCart,
  getCommercetoolsCart, placeCommercetoolsOrder, removeCommercetoolsCartItem, setCommercetoolsShippingAddress
} from '~/server/data/commercetools/carts'
import { mapCommercetoolsCart } from '~/server/app/v1/carts/mappers/carts.commercetools.mapper'

export class CartsCommercetoolsService extends CartsAbstractService {
  async createCart() {
    const response = await createCommercetoolsCart()
    return response.id
}

  async getCart(id: string) {
    const cart = await getCommercetoolsCart(id)

    return mapCommercetoolsCart(cart)
  }

  async addCartItem(cartId: string, item: UpdateCartPayload) {
     await addCommercetoolsCartItem(cartId, {
      version: item.version!,
      actions: [{
        action: 'addLineItem',
        productId: item.AddLineItem!.productId,
        variantId: 1,
        quantity: item.AddLineItem!.quantity,
      }]
    })
  }

  changeQuantity(cartId: string, item: UpdateCartPayload) {
    return changeCommercetoolsCartItemQuantity(cartId, {
      version: item.version!,
      actions: [{
        action: 'changeLineItemQuantity',
        lineItemId: item.ChangeLineItemQuantity?.lineItemId?.toString()!,
        quantity: item.ChangeLineItemQuantity!.quantity,
      }]
    })
  }

  removeItem(cartId: string, item: UpdateCartPayload) {
    return removeCommercetoolsCartItem(cartId, {
      version: item.version!,
      actions: [{
        action: 'removeLineItem',
        lineItemId: item.RemoveLineItem?.lineItemId?.toString()!
      }]
    })
  }

  async setShippingAddress(cartId: string, item: UpdateCartPayload) {
    const action = item.SetShippingAddress!
    const address = {
      city: action.city,
      country: action.country,
      email: action.email,
      firstName: action.firstName,
      lastName: action.lastName,
      postalCode: action.postalCode,
      region: action.region,
      streetName: action.streetName,
      streetNumber: action.streetNumber,
    }

    return setCommercetoolsShippingAddress(cartId, {
      version: item.version!,
      actions: [{
        action: 'setShippingAddress',
        address
      }]
    })
  }

  async placeOrder(cartId: string, version: number) {
    return placeCommercetoolsOrder({
        version,
        cart: {
          id: cartId,
          typeId: 'cart'
        }
    })
  }
}
