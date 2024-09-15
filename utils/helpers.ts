export const centsToDollars = (amount: number): string => {
  return (amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export const toDollars = (amount: number): string => {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
