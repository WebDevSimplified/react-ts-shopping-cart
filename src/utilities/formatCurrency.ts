

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
})

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}
export function formatCurrency2(price: { [key: string]: number }, size: string, quantity: number) {
  // Get the price for the selected size
  const selectedPrice = price[size] || 0;

  // Calculate the total price based on size and quantity
  const totalPrice = selectedPrice * quantity;

  // Format the total price and return it
  // Replace this line with your formatting logic
  return totalPrice.toFixed(2);
}


