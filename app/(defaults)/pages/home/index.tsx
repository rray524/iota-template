"use client";
import React from "react";
import Banner from "./content/banner";
import MapComponent from "./content/map/map";
import CalculatorGrid from "./content/calculator-grid";
import calculatorData from "../../../../data/calculator-items.json";
import PreConstructedListing from "./content/properties/pre-contructed";
import FeaturedListing from "./content/properties/featured-listing";
import SoldLProperties from "./content/properties/sold-properties";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedListing />
      <PreConstructedListing />
      <SoldLProperties />
      <CalculatorGrid items={calculatorData} />
      <MapComponent />
    </div>
  );
};

export default HomePage;
