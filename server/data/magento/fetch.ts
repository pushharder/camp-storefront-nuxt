export const magentoBaseURL = 'https://magento.sandbox.epamdev.com/rest/all'

export const magentoFetch = $fetch.create({
  baseURL: magentoBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
