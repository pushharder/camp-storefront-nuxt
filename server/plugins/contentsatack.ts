import Contentstack from 'contentstack'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const config = useRuntimeConfig()

    event.context.stack = Contentstack.Stack({
      api_key: config.contentstack.apiKey,
      delivery_token: config.contentstack.deliveryToken,
      environment: config.contentstack.environment
    })
  })
})
