/**
 * Currency Rate Widget Component
 * Displays current exchange rates for USD, EUR, and GBP
 * Updates every 30 seconds
 */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Card, CardContent, Grid, Chip, Tooltip } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { getExchangeRates, ExchangeRates } from "../services/exchangeRateService";

const PREFIX = "CurrencyRateWidget";

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  rateBox: `${PREFIX}-rateBox`,
  currencyCode: `${PREFIX}-currencyCode`,
  lastUpdated: `${PREFIX}-lastUpdated`,
  positive: `${PREFIX}-positive`,
  negative: `${PREFIX}-negative`,
  refreshing: `${PREFIX}-refreshing`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.root}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0.5, 1),
  },
  [`& .${classes.title}`]: {
    fontSize: "0.875rem",
    fontWeight: "bold",
  },
  [`& .${classes.rateBox}`]: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
  },
  [`& .${classes.currencyCode}`]: {
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
  [`& .${classes.lastUpdated}`]: {
    fontSize: "0.75rem",
    opacity: 0.8,
  },
  [`& .${classes.positive}`]: {
    color: "#4CAF50",
  },
  [`& .${classes.negative}`]: {
    color: "#f44336",
  },
  [`& .${classes.refreshing}`]: {
    animation: "$spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

/**
 * Currency rate widget that displays current exchange rates
 * @returns {JSX.Element} The currency rate widget component
 */
const CurrencyRateWidget: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [previousRates, setPreviousRates] = useState<Record<string, number> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Currencies to display in the widget
  const currencies = ["USD", "EUR", "GBP"];

  // Format date to a readable string
  const formatLastUpdated = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(date);
  };

  // Determine if a rate has increased, decreased, or stayed the same
  const getRateChange = (currency: string): "up" | "down" | "same" => {
    if (!previousRates || !rates) return "same";

    const current = rates.rates[currency];
    const previous = previousRates[currency];

    if (!previous) return "same";
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "same";
  };

  // Fetch exchange rates and update state
  const fetchRates = async () => {
    try {
      setIsLoading(true);
      const newRates = await getExchangeRates();

      // Store previous rates for comparison
      if (rates) {
        setPreviousRates(rates.rates);
      }

      setRates(newRates);
      setError(null);
    } catch (err) {
      setError("Failed to fetch exchange rates");
      console.error("Error fetching rates:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and set up interval
  useEffect(() => {
    fetchRates();

    // Update rates every 30 seconds
    const intervalId = setInterval(() => {
      fetchRates();
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format rate value for display
  const formatRate = (value: number): string => {
    return value.toFixed(4);
  };

  return (
    <StyledCard className={classes.root} data-test="currency-rate-widget">
      <CardContent style={{ padding: 8 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={4} sm={3}>
            <Box display="flex" alignItems="center">
              <Typography className={classes.title} variant="subtitle2">
                Exchange Rates
              </Typography>
              {isLoading && (
                <RefreshIcon
                  className={classes.refreshing}
                  fontSize="small"
                  style={{ marginLeft: 4 }}
                />
              )}
            </Box>
            {rates && (
              <Typography className={classes.lastUpdated} variant="caption">
                Updated: {formatLastUpdated(rates.lastUpdated)}
              </Typography>
            )}
          </Grid>

          <Grid item xs={8} sm={9}>
            <Grid container spacing={1} justifyContent="space-around">
              {currencies.map((currency) => {
                if (!rates) return null;

                const rateChange = getRateChange(currency);
                const rateValue = rates.rates[currency];

                return (
                  <Grid item key={currency}>
                    <Tooltip title={`1 USD = ${formatRate(rateValue)} ${currency}`} arrow>
                      <Chip
                        label={
                          <Box className={classes.rateBox}>
                            <Typography className={classes.currencyCode} variant="body2">
                              {currency}
                            </Typography>
                            <Typography variant="body2">{formatRate(rateValue)}</Typography>
                            {rateChange === "up" && (
                              <TrendingUpIcon
                                className={classes.positive}
                                fontSize="small"
                                style={{ marginLeft: 4 }}
                              />
                            )}
                            {rateChange === "down" && (
                              <TrendingDownIcon
                                className={classes.negative}
                                fontSize="small"
                                style={{ marginLeft: 4 }}
                              />
                            )}
                          </Box>
                        }
                        size="small"
                        color="default"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          color: "#000",
                        }}
                      />
                    </Tooltip>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default CurrencyRateWidget;
