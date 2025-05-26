/**
 * Tests for the Exchange Rate Service
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchExchangeRates,
  getExchangeRates,
  convertCurrency,
} from "../services/exchangeRateService";

// Mock fetch API
global.fetch = vi.fn();

describe("Exchange Rate Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("fetchExchangeRates", () => {
    it("should fetch exchange rates successfully", async () => {
      // Mock successful API response
      const mockResponse = {
        result: "success",
        base_code: "USD",
        time_last_update_utc: "2025-05-26 00:00:01",
        rates: {
          USD: 1,
          EUR: 0.92,
          GBP: 0.79,
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchExchangeRates();

      expect(global.fetch).toHaveBeenCalledWith("https://open.er-api.com/v6/latest/USD");
      expect(result).toEqual({
        baseCode: "USD",
        rates: {
          USD: 1,
          EUR: 0.92,
          GBP: 0.79,
        },
        lastUpdated: new Date("2025-05-26 00:00:01"),
      });
    });

    it("should return fallback rates if API call fails", async () => {
      // Mock failed API response
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

      const result = await fetchExchangeRates();

      expect(global.fetch).toHaveBeenCalledWith("https://open.er-api.com/v6/latest/USD");
      expect(result).toEqual({
        baseCode: "USD",
        rates: {
          USD: 1,
          EUR: 0.92,
          GBP: 0.79,
        },
        lastUpdated: expect.any(Date),
      });
    });
  });

  describe("convertCurrency", () => {
    const mockRates = {
      baseCode: "USD",
      rates: {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
      },
      lastUpdated: new Date(),
    };

    it("should convert from USD to EUR correctly", () => {
      const result = convertCurrency(100, "USD", "EUR", mockRates);
      expect(result).toBeCloseTo(92, 2);
    });

    it("should convert from EUR to USD correctly", () => {
      const result = convertCurrency(92, "EUR", "USD", mockRates);
      expect(result).toBeCloseTo(100, 2);
    });

    it("should convert from EUR to GBP correctly", () => {
      const result = convertCurrency(92, "EUR", "GBP", mockRates);
      expect(result).toBeCloseTo(79, 2);
    });

    it("should return the same amount when source and target currencies are the same", () => {
      const result = convertCurrency(100, "USD", "USD", mockRates);
      expect(result).toBe(100);
    });
  });

  describe("getExchangeRates", () => {
    it("should fetch new rates if cache is empty", async () => {
      // Mock fetchExchangeRates
      const mockRates = {
        baseCode: "USD",
        rates: { USD: 1, EUR: 0.92, GBP: 0.79 },
        lastUpdated: new Date(),
      };

      vi.spyOn(global, "Date").mockImplementation(() => new Date("2025-05-26T12:00:00Z"));
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: "success",
          base_code: "USD",
          time_last_update_utc: "2025-05-26 00:00:01",
          rates: mockRates.rates,
        }),
      });

      const result = await getExchangeRates();
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(
        expect.objectContaining({
          baseCode: "USD",
          rates: mockRates.rates,
        })
      );
    });
  });
});
