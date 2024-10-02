import { Metadata } from "next";
import React from "react";
import HomePage from "./pages/home";

export const metadata: Metadata = {
  title: "Home Page | Iota template",
  description:
    "Listing agent websites for your real home building dream full-fill",
};

const Home = () => {
  return <HomePage />;
};

export default Home;
