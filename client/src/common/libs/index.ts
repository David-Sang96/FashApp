type CurrencyCode = "MYR" | "USD" | "SGD";

const currencyConfig: Record<CurrencyCode, { locale: string }> = {
  MYR: { locale: "ms-MY" },
  USD: { locale: "en-US" },
  SGD: { locale: "en-SG" },
};

export const formatPrice = (value: number, currency: CurrencyCode = "MYR") => {
  const config = currencyConfig[currency];

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency,
  }).format(value);
};

/* 
This formats based on user’s browser region:

US → 1,000

Germany → 1.000

France → 1 000

Very useful for frontend apps.
*/
export const formatNumberAuto = (value: number) => {
  return new Intl.NumberFormat().format(value);
};

export function timeAgo(dateString: string) {
  const now = Date.now();
  const diff = now - new Date(dateString).getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}
