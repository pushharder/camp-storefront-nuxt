export const commercetoolsBaseURL = 'https://api.us-east-2.aws.commercetools.com/magento-migration'
const token = useRuntimeConfig().token

export const commercetoolsFetch = $fetch.create({
  baseURL: commercetoolsBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token
  }
})
