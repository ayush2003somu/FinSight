import { MCC_MAP } from "../data/mockData";

export function getTransactionsByDateRange(transactions, selectedPeriod) {
  const now = new Date();
  const cutoff = new Date(now);

  if (selectedPeriod === "1M") {
    cutoff.setMonth(now.getMonth() - 1);
   } else if (selectedPeriod === "3M") {
    cutoff.setMonth(now.getMonth() - 3);
    } else if (selectedPeriod === "6M") {
    cutoff.setMonth(now.getMonth() - 6);
  } else {
  cutoff.setFullYear(now.getFullYear() - 1);
  }

  return transactions.filter((transaction) => new Date(transaction.date) >= cutoff);
}

export function buildMonthlyData(transactions) {
  const monthlyBuckets = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", {
      month: "short",
    });

  if (!acc[month]) {
      acc[month] = { month, income: 0, expenses: 0 };
    }

   if (transaction.type === "income") {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expenses += transaction.amount;
    }

    return acc;
  }, {});

  return Object.values(monthlyBuckets);
}

export function buildCategoryData(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => {
      const categoryName = MCC_MAP[transaction.mcc] || "Other";
    const found = acc.find((item) => item.name === categoryName);

    if (found) {
      found.value += transaction.amount;
      } else {
        acc.push({ name: categoryName, value: transaction.amount });
    }

      return acc;
    }, []);
}

export function formatCurrency(value) {
  return `₹${value.toLocaleString()}`;
}
