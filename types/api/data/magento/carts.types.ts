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
