import { H3Event } from 'h3'

export const getPromo = async (event: H3Event) => {
  const sku = getRouterParam(event, 'sku')

  const stack = await event.context.stack

  const result = await stack.ContentType('product').Query()
    .where('sku', sku)
    .toJSON()
    .find()

  return {
    sku,
    promos: result[0].map((res: {order: number, description: string}) => ({ text: res.description, order: res.order })),
  }
}
