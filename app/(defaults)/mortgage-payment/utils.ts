export const rules = {
  interestRate: {
    required: "This is required",
    min: {
      value: 0,
      message: "Value must be at least 0.",
    },
  },
  mortgageAmount: {
    required: "This is required",
    min: {
      value: 0,
      message: "Value must be at least 0.",
    },
  },
  downpaymentPercentage: {
    required: "This is required",
    min: {
      value: 0,
      message: "Value must be at least 0.",
    },
    max: {
      value: 100,
      message: "Downpayment percentage cannot exceed 100%.",
    },
  },
  amortizationTerm: {
    required: "Amortization term is required",
    min: {
      value: 1,
      message: "Amortization term must be at least 1 year",
    },
  },
};

export const frequencies = {
  weekly: 52,
  "bi-weekly": 26,
  monthly: 12,
  "accelerated weekly": 52,
  "accelerated bi-weekly": 26,
} as const;

export type FrequencyType = keyof typeof frequencies;

export const mortgagePaymentCalculator = (
  mortgageAmount: number,
  interestRate: number,
  amortizationTerm: number,
  frequency: FrequencyType
) => {
  let annualInterestRate = interestRate / 100;
  let paymentsPerYear = frequencies[frequency];
  let totalPayments = amortizationTerm * paymentsPerYear;
  let periodicInterestRate = annualInterestRate / paymentsPerYear;
  let mortgagePayment;

  if (periodicInterestRate > 0) {
    mortgagePayment =
      (mortgageAmount *
        (periodicInterestRate *
          Math.pow(1 + periodicInterestRate, totalPayments))) /
      (Math.pow(1 + periodicInterestRate, totalPayments) - 1);
  } else {
    mortgagePayment = mortgageAmount / totalPayments;
  }

  let totalPaid = mortgagePayment * totalPayments;
  let totalInterest = totalPaid - mortgageAmount;

  return { mortgagePayment, totalInterest };
};
