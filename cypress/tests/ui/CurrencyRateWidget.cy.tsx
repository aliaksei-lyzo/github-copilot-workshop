import { mount } from "cypress/react";
import { ThemeProvider, createTheme } from "@mui/material";
import CurrencyRateWidget from "../../components/CurrencyRateWidget";
import * as exchangeRateService from "../../services/exchangeRateService";

// Create a theme for the component
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

describe("CurrencyRateWidget.cy.tsx", () => {
  beforeEach(() => {
    // Stub the getExchangeRates method
    cy.stub(exchangeRateService, "getExchangeRates").resolves({
      baseCode: "USD",
      rates: {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
      },
      lastUpdated: new Date("2025-05-26T12:00:00Z"),
    });
  });

  it("renders the widget with exchange rates", () => {
    // Mount the component with the theme provider
    mount(
      <ThemeProvider theme={theme}>
        <CurrencyRateWidget />
      </ThemeProvider>
    );

    // Check that the widget title is displayed
    cy.contains("Exchange Rates").should("be.visible");

    // Check that the currency codes are displayed
    cy.contains("USD").should("be.visible");
    cy.contains("EUR").should("be.visible");
    cy.contains("GBP").should("be.visible");

    // Check that the rates are displayed
    cy.contains("1.0000").should("be.visible");
    cy.contains("0.9200").should("be.visible");
    cy.contains("0.7900").should("be.visible");

    // Check that the updated timestamp is displayed
    cy.contains("Updated:").should("be.visible");
  });

  it("shows loading state while fetching rates", () => {
    // Make the stub return a promise that never resolves to simulate loading
    cy.stub(exchangeRateService, "getExchangeRates").returns(new Promise(() => {}));

    mount(
      <ThemeProvider theme={theme}>
        <CurrencyRateWidget />
      </ThemeProvider>
    );

    // Check that the loading indicator is visible
    cy.get('[data-test="currency-rate-widget"]')
      .find(".MuiCircularProgress-root")
      .should("be.visible");
  });

  it("handles rate changes with visual indicators", () => {
    // First load with initial rates
    cy.stub(exchangeRateService, "getExchangeRates").resolves({
      baseCode: "USD",
      rates: {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
      },
      lastUpdated: new Date("2025-05-26T12:00:00Z"),
    });

    mount(
      <ThemeProvider theme={theme}>
        <CurrencyRateWidget />
      </ThemeProvider>
    );

    // Wait for initial render
    cy.wait(500);

    // Now update the rates
    cy.stub(exchangeRateService, "getExchangeRates").resolves({
      baseCode: "USD",
      rates: {
        USD: 1,
        EUR: 0.94, // Increased
        GBP: 0.77, // Decreased
      },
      lastUpdated: new Date("2025-05-26T12:30:00Z"),
    });

    // Trigger a refresh by clicking the widget
    cy.get('[data-test="currency-rate-widget"]').click();

    // Check for the trend indicators
    cy.get('[data-test="trend-up-EUR"]').should("be.visible");
    cy.get('[data-test="trend-down-GBP"]').should("be.visible");
  });
});
