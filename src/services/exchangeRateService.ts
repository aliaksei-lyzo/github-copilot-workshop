/**
 * Service to fetch and manage currency exchange rates
 * @module services/exchangeRateService
 */

/**
 * Represents exchange rates with USD as the base currency
 */
export interface ExchangeRates {
  baseCode: string;
  rates: {
    [key: string]: number;
  };
  lastUpdated: Date;
}

/**
 * Fetches the latest exchange rates from ExchangeRate-API
 * @returns {Promise<ExchangeRates>} Exchange rates with USD as base currency
 */
export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    return {
      baseCode: data.base_code,
      rates: data.rates,
      lastUpdated: new Date(data.time_last_update_utc),
    };
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    // Return fallback rates if API call fails
    return {
      baseCode: "USD",
      rates: {
        EUR: 0.92, // Fallback rates
        GBP: 0.79,
        USD: 1,
      },
      lastUpdated: new Date(),
    };
  }
};

// Cached exchange rates
let cachedRates: ExchangeRates | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Gets exchange rates, using cached values if available and not expired
 * @returns {Promise<ExchangeRates>} Exchange rates with USD as base currency
 */
export const getExchangeRates = async (): Promise<ExchangeRates> => {
  const now = Date.now();

  // Use cached rates if available and not expired
  if (cachedRates && now - lastFetchTime < CACHE_DURATION) {
    return cachedRates;
  }

  // Fetch new rates
  const rates = await fetchExchangeRates();

  // Update cache
  cachedRates = rates;
  lastFetchTime = now;

  return rates;
};

/**
 * Converts an amount from one currency to another
 * @param {number} amount - The amount to convert
 * @param {string} fromCurrency - The source currency code
 * @param {string} toCurrency - The target currency code
 * @param {ExchangeRates} rates - Exchange rates object
 * @returns {number} The converted amount
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ExchangeRates
): number => {
  if (fromCurrency === toCurrency) return amount;

  // Convert from source currency to USD (base currency)
  const amountInUSD = fromCurrency === "USD" ? amount : amount / rates.rates[fromCurrency];

  // Convert from USD to target currency
  return toCurrency === "USD" ? amountInUSD : amountInUSD * rates.rates[toCurrency];
};
