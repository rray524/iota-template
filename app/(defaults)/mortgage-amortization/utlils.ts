export type FormValues = {
  askingPrice: string;
  downpayment: string;
  downpaymentPercentage: string;
  interestRate: string;
  mortgageTerm: string;
  amortizationTerm: string;
  firstTimeHomeBuyer: string;
  frequency: string;
};

export const initialState: FormValues = {
  askingPrice: "500000",
  downpayment: "50000",
  downpaymentPercentage: "10",
  interestRate: "6",
  mortgageTerm: "5",
  amortizationTerm: "10",
  firstTimeHomeBuyer: "yes",
  frequency: "Weekly",
};

export type Results = {
  downpayment: number;
  downpaymentPercentage: number;
  cmhcPremium: number;
  amountFinanced: number;
  payment: number;
  principalPaidAtTerm: number;
  balanceAtTerm: number;
  totalInterestPaid: number;
  schedule: {
    paymentNumber: number;
    totalPayment: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }[];
} | null;
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
  mortgageTerm: {
    required: "This is required",
    min: {
      value: 1,
      message: "Value must be at least 1 year.",
    },
  },
  amortizationTerm: {
    required: "This is required",
    min: {
      value: 1,
      message: "Value must be at least 1 year.",
    },
  },
};

export const calculateCMHCInsurancePremium = (
  mortgageAmount: number,
  purchasePrice: number,
  amortizationPeriod: number,
  firstTimeHomeBuyer: string
) => {
  const ltvRatio = (mortgageAmount / purchasePrice) * 100;
  let premiumRate;

  if (amortizationPeriod <= 25) {
    if (ltvRatio <= 80) {
      return 0;
    } else if (ltvRatio <= 85) {
      premiumRate = 0.01;
    } else if (ltvRatio <= 90) {
      premiumRate = 0.0175;
    } else {
      premiumRate = 0.02;
    }
  } else {
    if (ltvRatio <= 80) {
      return 0;
    } else if (ltvRatio <= 85) {
      premiumRate = 0.0125;
    } else if (ltvRatio <= 90) {
      premiumRate = 0.02;
    } else {
      premiumRate = 0.0225;
    }
  }

  if (firstTimeHomeBuyer === "yes") {
    premiumRate *= 0.9;
  }

  return mortgageAmount * premiumRate;
};

const periodsPerYear: { [key: string]: number } = {
  Weekly: 52,
  "Bi-weekly": 26,
  Monthly: 12,
  "Accelerated Weekly": 52,
  "Accelerated Bi-weekly": 26,
};

export const calculate = (
  askingPrice: number,
  downpayment: number,
  cmhcPremium: number,
  frequency: string,
  annualRate: number,
  amortizationTerm: number,
  mortgageTerm: number
) => {
  const amountFinanced = askingPrice - downpayment + cmhcPremium;

  const totalPayments = periodsPerYear[frequency] * amortizationTerm;
  const ratePerPeriod = annualRate / periodsPerYear[frequency];

  const payment =
    (amountFinanced * ratePerPeriod) /
    (1 - Math.pow(1 + ratePerPeriod, -totalPayments));

  let schedule: any = [];
  let balance = amountFinanced;
  let totalInterestPaid = 0;

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = balance * ratePerPeriod;
    const principalPayment = payment - interestPayment;
    balance -= principalPayment;
    totalInterestPaid += interestPayment;
    schedule.push({
      paymentNumber: i,
      totalPayment: payment,
      principalPaid: principalPayment,
      interestPaid: interestPayment,
      remainingBalance: balance,
    });
  }

  const principalPaidAtTerm = schedule
    .filter(
      (payment: { paymentNumber: number }) =>
        payment.paymentNumber <= periodsPerYear[frequency] * mortgageTerm
    )
    .reduce(
      (sum: number, payment: { principalPaid: any }) =>
        sum + payment.principalPaid,
      0
    );

  const balanceAtTerm =
    schedule.find(
      (payment: { paymentNumber: number }) =>
        payment.paymentNumber === periodsPerYear[frequency] * mortgageTerm
    )?.remainingBalance || 0;

  return {
    amountFinanced,
    payment,
    principalPaidAtTerm,
    balanceAtTerm,
    totalInterestPaid,
    schedule,
  };
};

export const formatPrice = (value: number | string): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(typeof value === "number" ? value : parseFloat(value));
};
