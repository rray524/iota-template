export const truncateText = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};

export const formattedPrice = (value: string | number): string => {
  if (value === undefined || value === null || value === "") {
    return "0.00";
  }
  if (typeof value === "number") {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const numberValue = parseFloat(value.replace(/,/g, ""));
  if (isNaN(numberValue)) {
    return "0.00";
  }
  return numberValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
