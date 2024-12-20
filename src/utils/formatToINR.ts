export function formatToINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0, // Optional: For no decimals
    maximumFractionDigits: 0, // Optional: For no decimals
  }).format(amount);
}
