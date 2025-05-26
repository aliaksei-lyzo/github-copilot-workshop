/**
 * Transaction header component that wraps the currency widget and navigation tabs
 */
import React from "react";
import TransactionNavTabs from "./TransactionNavTabs";
import CurrencyRateWidget from "./CurrencyRateWidget";

/**
 * A component that combines the Currency Rate Widget and Transaction Navigation Tabs
 * to be used in the main transaction pages
 */
const TransactionHeader: React.FC = () => {
  return (
    <>
      <CurrencyRateWidget />
      <TransactionNavTabs />
    </>
  );
};

export default TransactionHeader;
