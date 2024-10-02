"use client";
import React, { useState } from "react";
import {
  calculateBCTax,
  calculateManitobaTax,
  calculateMontrealTax,
  calculateNFLLTax,
  calculateNewBrunswickTax,
  calculateNorthwestTerritoriesTax,
  calculateNovaScotiaTax,
  calculateOntarioTax,
  calculatePEITax,
  calculateQuebecTax,
  calculateRebate,
  calculateSaskatchewanTax,
  calculateTorontoTax,
  locationOptions,
} from "./utils";
import { useForm } from "react-hook-form";
import Title from "@/components/calculator-title";
import { Input } from "../mortgage-payment/component";
import Results from "./component";

type ResultsType = {
  totalTransferTax: number;
  provincialTax: number;
  municipalTax: number;
  rebateReturn: number;
  notice: string;
};

const LandTransferTaxCalculator = () => {
  const [results, setResults] = useState<ResultsType | null>(null);

  const {
    register,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      askingPrice: "500000",
      firstTimeBuyer: false,
      location: "",
    },
  });

  const formValues = watch();

  const calculateTax = () => {
    trigger();
    if (!isValid) return;

    const askingPrice = parseFloat(formValues.askingPrice);
    const firstTimeBuyer = formValues.firstTimeBuyer;
    const location = formValues.location;

    let provincialTax = 0;
    let municipalTax = 0;
    let notice = "";

    switch (location) {
      case "Ontario":
        provincialTax = calculateOntarioTax(askingPrice);
        break;
      case "Toronto":
        provincialTax = calculateTorontoTax(askingPrice);
        municipalTax = provincialTax;
        break;
      case "British Columbia":
        provincialTax = calculateBCTax(askingPrice);
        break;
      case "Manitoba":
        provincialTax = calculateManitobaTax(askingPrice);
        break;
      case "Montreal":
        municipalTax = calculateMontrealTax(askingPrice);
        break;
      case "Québec":
        municipalTax = calculateQuebecTax(askingPrice);
        break;
      case "New Brunswick":
        provincialTax = calculateNewBrunswickTax(askingPrice);
        break;
      case "Prince Edward Island":
        provincialTax = calculatePEITax(askingPrice);
        break;
      case "Newfoundland and Labrador":
        provincialTax = calculateNFLLTax(askingPrice);
        break;
      case "Northwest Territories":
        provincialTax = calculateNorthwestTerritoriesTax(askingPrice);
        break;
      case "Nova Scotia":
        municipalTax = calculateNovaScotiaTax(askingPrice);
        break;
      case "Nunavut":
        provincialTax = 0;
        break;
      case "Saskatchewan":
        notice = calculateSaskatchewanTax(askingPrice);
        break;
      case "Yukon":
        provincialTax = 0;
        break;
      default:
        alert("Please select a valid location.");
        return;
    }

    let rebateReturn = 0;
    if (firstTimeBuyer) {
      rebateReturn = calculateRebate(
        location,
        askingPrice,
        provincialTax,
        municipalTax
      );
    }

    const totalTransferTax = provincialTax + municipalTax - rebateReturn;

    setResults({
      totalTransferTax,
      provincialTax,
      municipalTax,
      rebateReturn,
      notice,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <Title> Land Transfer Tax Calculator</Title>
      <form className="space-y-6">
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

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <select
            {...register("location", {
              required: "Please Select Location",
            })}
            name="location"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select Location
            </option>
            {locationOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <input
            {...register("firstTimeBuyer")}
            type="checkbox"
            name="firstTimeBuyer"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label
            htmlFor="firstTimeBuyer"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            First-Time Buyer
          </label>
        </div>

        <button
          type="button"
          onClick={calculateTax}
          disabled={Object.keys(errors).length > 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Calculate
        </button>
      </form>

      {results && <Results {...results} />}
    </div>
  );
};

export default LandTransferTaxCalculator;
