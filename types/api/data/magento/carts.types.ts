export interface MagentoCartLineItem {
  item_id: number
  sku: string
  qty: number
  name: string
  price: number
  product_type: string
  quote_id: string
}
export interface MagentoCart {
  currency: {
    store_currency_code: string
  }
  items_qty: number
}

export interface MagentoAddCartItemPayload {
  cartItem: {
    qty: number
    quote_id: string
    sku: string
  }
}

export interface MagentoChangeCartItemQuantityPayload {
  cartItem: {
    qty: number
    quote_id: string
  }
}

export interface MagentoSetShippingAddressPayload {
  addressInformation: {
    shipping_address: {
      city: string
      country_id: string
      email: string
      firstname: string
      lastname: string
      postcode: string
      region: string
      region_code: string
      region_id?: number
      street: string[]
      telephone: string
    }
    shipping_carrier_code?: string
    shipping_method_code?: string
  }
}

export interface MagentoPlaceOrderPayload {
  paymentMethod: {
    method: string
  }
}

export interface MagentoPaymentMethod {
  code: string
  title: string
}

export interface MagentoEstimateShippingMethodPayload {
  address: {
    city: string
    country_id: string
    email: string
    firstname: string
    lastname: string
    postcode: string
    region: string
    region_code: string
    region_id?: number
    street: string[]
    telephone: string
  }
}

export interface MagentoShippingMethod {
  carrier_code: string
  method_code: string
  carrier_title: string
  method_title: string
}
