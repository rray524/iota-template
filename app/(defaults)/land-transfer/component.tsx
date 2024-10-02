import React from "react";
import { formatPrice } from "../mortgage-amortization/utlils";

type ResultsProps = {
  totalTransferTax: number;
  provincialTax: number;
  municipalTax: number;
  rebateReturn: number;
  notice: string;
};

const Results: React.FC<ResultsProps> = ({
  totalTransferTax,
  provincialTax,
  municipalTax,
  rebateReturn,
  notice,
}) => {
  return (
    <div
      id="results"
      className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Results</h2>
      <div className="space-y-4">
        <p className="flex justify-between items-center text-lg">
          <span className="font-medium text-gray-700">Total Transfer Tax:</span>
          <span className="text-blue-800">
            ${formatPrice(totalTransferTax.toFixed(2))}
          </span>
        </p>
        <p className="flex justify-between items-center text-lg">
          <span className="font-medium text-gray-700">Provincial Tax:</span>
          <span className="text-blue-800">
            ${formatPrice(provincialTax.toFixed(2))}
          </span>
        </p>
        <p className="flex justify-between items-center text-lg">
          <span className="font-medium text-gray-700">Municipal Tax:</span>
          <span className="text-blue-800">
            ${formatPrice(municipalTax.toFixed(2))}
          </span>
        </p>
        <p className="flex justify-between items-center text-lg">
          <span className="font-medium text-gray-700">Rebate:</span>
          <span className="text-blue-800">
            ${formatPrice(rebateReturn.toFixed(2))}
          </span>
        </p>
        {notice && (
          <p className="text-center text-md font-semibold text-red-600">
            {notice}
          </p>
        )}
      </div>
    </div>
  );
};

export default Results;
