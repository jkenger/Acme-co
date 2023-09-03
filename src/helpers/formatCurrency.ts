export function formatCurrency(to: string, value: number) {
  to;
  return new Intl.NumberFormat(to, {
    style: "currency",
    currency: to,
  }).format(value);
}
