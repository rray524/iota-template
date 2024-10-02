"use client";
import React, { useState } from "react";
import { Input } from "./component";
import {
  FrequencyType,
  frequencies,
  mortgagePaymentCalculator,
  rules,
} from "./utils";
import { useForm } from "react-hook-form";
import Title from "@/components/calculator-title";
import { formatPrice } from "../mortgage-amortization/utlils";

const initialState = {
  mortgageAmount: "500000",
  interestRate: "6",
  amortizationTerm: "20",
  frequency: "weekly",
};

const MortgagePaymentCalculator = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: initialState,
  });

  const [results, setResults] = useState<{
    mortgagePayment: number | null;
    totalInterest: number | null;
  }>({
    mortgagePayment: null,
    totalInterest: null,
  });

  const calculateMortgage = () => {
    const formValues = getValues();
    let mortgageAmount = parseFloat(formValues.mortgageAmount);
    let interestRate = parseFloat(formValues.interestRate);
    let amortizationTerm = parseInt(formValues.amortizationTerm);
    let frequency = formValues.frequency as FrequencyType;

    let result = mortgagePaymentCalculator(
      mortgageAmount,
      interestRate,
      amortizationTerm,
      frequency
    );

    setResults(result);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <Title>Mortgage Payment Calculator</Title>
      <form className="space-y-6">
        <Input
          type="number"
          name="mortgageAmount"
          label="Mortgage Amount ($)"
          register={register("mortgageAmount", rules.mortgageAmount)}
          error={errors.mortgageAmount}
        />

        <Input
          type="number"
          name="interestRate"
          label="Interest Rate (%)"
          register={register("interestRate", rules.interestRate)}
          error={errors.interestRate}
        />

        <Input
          type="number"
          name="amortizationTerm"
          label="Amortization Term (years)"
          register={register("amortizationTerm", rules?.amortizationTerm)}
          error={errors.amortizationTerm}
        />

        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Frequency
          </label>
          <select
            {...register("frequency", { required: "This is required" })}
            name="frequency"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {Object.keys(frequencies).map((freq) => (
              <option key={freq} value={freq}>
                {freq.charAt(0).toUpperCase() + freq.slice(1)} (
                {frequencies[freq as FrequencyType]} payments/year)
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={calculateMortgage}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={Object.keys(errors).length > 0}
        >
          Calculate
        </button>
      </form>

      {results.mortgagePayment !== null && results.totalInterest !== null && (
        <div
          id="results"
          className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Results:</h2>
          <div className="space-y-4">
            <p className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-700">Your payment:</span>
              <span className="text-blue-800">
                ${formatPrice(results.mortgagePayment.toFixed(2))}
              </span>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-700">Total interest:</span>
              <span className="text-blue-800">
                ${formatPrice(results.totalInterest.toFixed(2))}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgagePaymentCalculator;
