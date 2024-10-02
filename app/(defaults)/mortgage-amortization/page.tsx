"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "./components";
import { useForm } from "react-hook-form";
import {
  FormValues,
  Results,
  calculate,
  calculateCMHCInsurancePremium,
  formatPrice,
  initialState,
  rules,
} from "./utlils";
import Title from "@/components/calculator-title";

const MortgageCalculator: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: initialState,
  });

  const [results, setResults] = useState<Results>(null);
  const lastUpdatedField = useRef<keyof FormValues | null>(null);

  const formValues = watch();

  useEffect(() => {
    if (
      lastUpdatedField.current === "downpayment" &&
      formValues.downpayment &&
      formValues.askingPrice
    ) {
      const askingPrice = parseFloat(formValues.askingPrice);
      const downpayment = parseFloat(formValues.downpayment);
      const downpaymentPercentage = ((downpayment / askingPrice) * 100).toFixed(
        2
      );

      setValue("downpaymentPercentage", downpaymentPercentage);
    } else if (
      lastUpdatedField.current === "downpaymentPercentage" &&
      formValues.downpaymentPercentage &&
      formValues.askingPrice
    ) {
      const askingPrice = parseFloat(formValues.askingPrice);
      const downpaymentPercentage = parseFloat(
        formValues.downpaymentPercentage
      );
      const downpayment = ((downpaymentPercentage / 100) * askingPrice).toFixed(
        2
      );

      setValue("downpayment", downpayment);
    }

    lastUpdatedField.current = null;
  }, [
    formValues.downpayment,
    formValues.downpaymentPercentage,
    formValues.askingPrice,
    setValue,
  ]);

  const calculateMortgage = () => {
    const askingPrice = parseFloat(formValues.askingPrice);
    let downpayment = parseFloat(formValues.downpayment);
    let downpaymentPercentage = parseFloat(formValues.downpaymentPercentage);
    const annualRate = parseFloat(formValues.interestRate) / 100;
    const mortgageTerm = parseInt(formValues.mortgageTerm);
    const amortizationTerm = parseInt(formValues.amortizationTerm);
    const firstTimeHomeBuyer = formValues.firstTimeHomeBuyer;
    const frequency = formValues.frequency;

    if (
      !isNaN(downpayment) &&
      downpayment > 0 &&
      isNaN(downpaymentPercentage)
    ) {
      downpaymentPercentage = (downpayment / askingPrice) * 100;
      setValue("downpaymentPercentage", downpaymentPercentage.toFixed(2));
    } else if (
      !isNaN(downpaymentPercentage) &&
      downpaymentPercentage > 0 &&
      isNaN(downpayment)
    ) {
      downpayment = (downpaymentPercentage / 100) * askingPrice;
      setValue("downpayment", downpayment.toFixed(2));
    }

    const cmhcPremium = calculateCMHCInsurancePremium(
      askingPrice - downpayment,
      askingPrice,
      amortizationTerm,
      firstTimeHomeBuyer
    );

    const {
      amountFinanced,
      payment,
      principalPaidAtTerm,
      balanceAtTerm,
      totalInterestPaid,
      schedule,
    } = calculate(
      askingPrice,
      downpayment,
      cmhcPremium,
      frequency,
      annualRate,
      amortizationTerm,
      mortgageTerm
    );

    setResults({
      downpayment,
      downpaymentPercentage,
      cmhcPremium,
      amountFinanced,
      payment,
      principalPaidAtTerm,
      balanceAtTerm,
      totalInterestPaid,
      schedule,
    });
  };

  return (
    <div className="w-[90%] sm:w-[50%] bg-white shadow-lg mx-auto p-4 my-10">
      <Title>Mortgage Amortization Calculator</Title>
      <form className="space-y-4">
        <Input
          label="Asking Price:"
          register={register("askingPrice", {
            required: "This is required",
            min: {
              value: 0,
              message: "Value must be at least 0.",
            },
          })}
          name="askingPrice"
          type="number"
          error={errors.askingPrice}
        />

        <Input
          label="Down Payment:"
          register={register("downpayment", {
            onChange: () => {
              lastUpdatedField.current = "downpayment";
            },
            validate: (value) => {
              if (parseFloat(value) < 0 || value === "") {
                return "Value must be at least 0.";
              } else if (
                parseFloat(value) > parseFloat(formValues.askingPrice)
              ) {
                return "Downpayment amount cannot be greater than asking price";
              }
              return true;
            },
          })}
          name="downpayment"
          type="number"
          error={errors.downpayment}
        />
        <Input
          label="Down Payment Percentage:"
          register={register("downpaymentPercentage", {
            ...rules.downpaymentPercentage,
            onChange: () => {
              lastUpdatedField.current = "downpaymentPercentage";
            },
          })}
          name="downpaymentPercentage"
          type="number"
          error={errors.downpaymentPercentage}
        />

        <Input
          label="Interest Rate (Annual %):"
          register={register("interestRate")}
          name="interestRate"
          type="number"
          error={errors.interestRate}
        />

        <Input
          label="Mortgage Term (years):"
          register={register("mortgageTerm", rules.mortgageTerm)}
          name="mortgageTerm"
          type="number"
          error={errors.mortgageTerm}
        />

        <Input
          label="Amortization Term (years):"
          register={register("amortizationTerm", rules.amortizationTerm)}
          name="amortizationTerm"
          type="number"
          error={errors.amortizationTerm}
        />

        <div>
          <label
            htmlFor="firstTimeHomeBuyer"
            className="block mb-2 font-semibold"
          >
            First Time Home Buyer:
          </label>
          <select
            {...register("firstTimeHomeBuyer")}
            name="firstTimeHomeBuyer"
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="frequency" className="block mb-2 font-semibold">
            Payment Frequency:
          </label>
          <select
            {...register("frequency")}
            name="frequency"
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="Weekly">Weekly (52 payments/year)</option>
            <option value="Bi-weekly">Bi-weekly (26 payments/year)</option>
            <option value="Monthly">Monthly (12 payments/year)</option>
            <option value="Accelerated Weekly">
              Accelerated Weekly (52 payments/year)
            </option>
            <option value="Accelerated Bi-weekly">
              Accelerated Bi-weekly (26 payments/year)
            </option>
          </select>
        </div>
        <button
          type="button"
          disabled={Object.keys(errors).length > 0}
          onClick={calculateMortgage}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>

      {results && (
        <div
          id="results"
          className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Results</h2>
          <div className="space-y-4">
            <p className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-700">Downpayment:</span>
              <span className="text-blue-800">
                ${formatPrice(results.downpayment.toFixed(2))}
              </span>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-700">
                Financed Amount (including CMHC:
              </span>
              <span className="text-blue-800">
                ${results.cmhcPremium.toFixed(2)}
                ): ${formatPrice(results.amountFinanced.toFixed(2))}
              </span>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-700">Each Payment:</span>
              <span className="text-blue-800">
                ${formatPrice(results.payment.toFixed(2))}
              </span>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-700">
                Principal Paid at Mortgage Term:
              </span>
              <span className="text-blue-800">
                ${formatPrice(results.principalPaidAtTerm.toFixed(2))}
              </span>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-700">
                Balance at Mortgage Term:
              </span>
              <span className="text-blue-800">
                ${formatPrice(results.balanceAtTerm.toFixed(2))}
              </span>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-700">
                Interest Paid at Amortization Period:
              </span>
              <span className="text-blue-800">
                ${formatPrice(results.totalInterestPaid.toFixed(2))}
              </span>
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Amortization Payment Schedule:
            </h3>
            <div className="overflow-x-auto overflow-y-auto max-h-[500px] scrollable-container">
              <table className="border-collapse border border-gray-500 w-full mt-2">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="border border-gray-500 px-2 py-1">
                      Payment Number
                    </th>
                    <th className="border border-gray-500 px-2 py-1">
                      Total Payment
                    </th>
                    <th className="border border-gray-500 px-2 py-1">
                      Principal Paid
                    </th>
                    <th className="border border-gray-500 px-2 py-1">
                      Interest Paid
                    </th>
                    <th className="border border-gray-500 px-2 py-1">
                      Remaining Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((payment) => (
                    <tr key={payment.paymentNumber}>
                      <td className="border border-gray-500 px-2 py-1 text-center">
                        {payment.paymentNumber}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-right">
                        ${formatPrice(payment.totalPayment.toFixed(2))}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-right">
                        ${formatPrice(payment.principalPaid.toFixed(2))}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-right">
                        ${formatPrice(payment.interestPaid.toFixed(2))}
                      </td>
                      <td className="border border-gray-500 px-2 py-1 text-right">
                        $
                        {Math.abs(
                          parseFloat(
                            formatPrice(payment.remainingBalance.toFixed(2))
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
