export const calculateOntarioTax = (askingPrice: number) => {
  let tax = 0;
  if (askingPrice > 2000000) {
    tax += (askingPrice - 2000000) * 0.025;
    askingPrice = 2000000;
  }
  if (askingPrice > 400000) {
    tax += (askingPrice - 400000) * 0.02;
    askingPrice = 400000;
  }
  if (askingPrice > 250000) {
    tax += (askingPrice - 250000) * 0.015;
    askingPrice = 250000;
  }
  if (askingPrice > 55000) {
    tax += (askingPrice - 55000) * 0.01;
    askingPrice = 55000;
  }
  if (askingPrice > 0) {
    tax += askingPrice * 0.005;
  }
  return tax;
};
export const calculateTorontoTax = (askingPrice: number) => {
  let tax = 0;
  if (askingPrice > 2000000) {
    tax += (askingPrice - 2000000) * 0.025;
    askingPrice = 2000000;
  }
  if (askingPrice > 400000) {
    tax += (askingPrice - 400000) * 0.02;
    askingPrice = 400000;
  }
  if (askingPrice > 250000) {
    tax += (askingPrice - 250000) * 0.015;
    askingPrice = 250000;
  }
  if (askingPrice > 55000) {
    tax += (askingPrice - 55000) * 0.01;
    askingPrice = 55000;
  }
  if (askingPrice > 0) {
    tax += askingPrice * 0.005;
  }
  return tax;
};

export const calculateBCTax = (askingPrice: number) => {
  let tax = 0;
  if (askingPrice <= 200000) {
    tax += askingPrice * 0.01;
  } else {
    tax += 200000 * 0.01;
    askingPrice -= 200000;

    if (askingPrice <= 1800000) {
      tax += askingPrice * 0.02;
    } else {
      tax += 1800000 * 0.02;
      askingPrice -= 1800000;
    }
  }
  return tax;
};

export const calculateManitobaTax = (askingPrice: number) => {
  let tax = 0;
  if (askingPrice > 200000) {
    tax += (askingPrice - 200000) * 0.02;
    askingPrice = 200000;
  }
  if (askingPrice > 150000) {
    tax += (askingPrice - 150000) * 0.015;
    askingPrice = 150000;
  }
  if (askingPrice > 90000) {
    tax += (askingPrice - 90000) * 0.01;
    askingPrice = 90000;
  }
  if (askingPrice > 30000) {
    tax += (askingPrice - 30000) * 0.005;
  }
  tax += 70;
  return tax;
};

export const calculateMontrealTax = (askingPrice: number) => {
  let tax = 0;
  if (askingPrice > 1034200) {
    tax += (askingPrice - 1034200) * 0.025;
    askingPrice = 1034200;
  }
  if (askingPrice > 517100) {
    tax += (askingPrice - 517100) * 0.02;
    askingPrice = 517100;
  }
  if (askingPrice > 258600) {
    tax += (askingPrice - 258600) * 0.015;
    askingPrice = 258600;
  }
  if (askingPrice > 51700) {
    tax += (askingPrice - 51700) * 0.01;
    askingPrice = 51700;
  }
  if (askingPrice > 0) {
    tax += askingPrice * 0.005;
  }
  return tax;
};

export const calculateQuebecTax = (askingPrice: number) => {
  let tax = 0;
  if (askingPrice > 258600) {
    tax += (askingPrice - 258600) * 0.015;
    askingPrice = 258600;
  }
  if (askingPrice > 51700) {
    tax += (askingPrice - 51700) * 0.01;
    askingPrice = 51700;
  }
  if (askingPrice > 0) {
    tax += askingPrice * 0.005;
  }
  return tax;
};

export const calculateNewBrunswickTax = (askingPrice: number) =>
  askingPrice * 0.01;
export const calculatePEITax = (askingPrice: number) => askingPrice * 0.01;
export const calculateNFLLTax = (askingPrice: number) =>
  (askingPrice - 500) * 0.004 + 100;
export const calculateNorthwestTerritoriesTax = (askingPrice: number) => {
  if (askingPrice <= 1000000) {
    return Math.max(100, 1.5 * (askingPrice / 1000));
  } else {
    return 1500 + (askingPrice - 1000000) / 1000;
  }
};
export const calculateNovaScotiaTax = (askingPrice: number) =>
  askingPrice * 0.015;
export const calculateSaskatchewanTax = (askingPrice: number) =>
  "You may be required to pay title transfer fees.";

export const calculateRebate = (
  location: string,
  askingPrice: number,
  provincialTax: number,
  municipalTax: number
) => {
  let rebateReturn = 0;
  switch (location) {
    case "Ontario":
      if (askingPrice <= 368000) {
        rebateReturn = provincialTax + municipalTax;
      } else {
        rebateReturn = 4000;
      }
      break;
    case "Toronto":
      if (askingPrice < 400000) {
        rebateReturn = provincialTax + municipalTax;
      } else {
        rebateReturn = 8475;
      }
      break;
    case "British Columbia":
      if (askingPrice <= 500000) {
        rebateReturn = provincialTax + municipalTax;
      } else if (askingPrice <= 835000) {
        rebateReturn = 8000;
      } else if (askingPrice <= 860000) {
        rebateReturn = 8000 - (askingPrice - 835000) * 0.32;
      }
      break;
    case "Prince Edward Island":
      rebateReturn = provincialTax + municipalTax;
      break;
    default:
      return rebateReturn;
  }
  return rebateReturn;
};

export const locationOptions = [
  { value: "Ontario", label: "Ontario" },
  { value: "Toronto", label: "Toronto" },
  { value: "British Columbia", label: "British Columbia" },
  { value: "Manitoba", label: "Manitoba" },
  { value: "Montreal", label: "Montreal,Québec" },
  { value: "Québec", label: "Québec" },
  { value: "New Brunswick", label: "New Brunswick" },
  { value: "Newfoundland and Labrador", label: "Newfoundland and Labrador" },
  { value: "Nova Scotia", label: "Nova Scotia" },
  { value: "Saskatchewan", label: "Saskatchewan" },
  { value: "Yukon", label: "Yukon" },
  { value: "Prince Edward Island", label: "Prince Edward Island" },
  { value: "Nunavut", label: "Nunavut" },
  { value: "Northwest Territories", label: "Northwest Territories" },
];
