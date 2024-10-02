"use client";

import { Suspense } from "react";
import BannerContent from "./content";

const FallBack = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="skeleton h-10 w-3/4 mx-auto mb-6"></div>
    <div className="skeleton h-6 w-1/2 mx-auto mb-4"></div>
    <div className="flex justify-center mt-8 space-x-4">
      <div className="skeleton h-12 w-32 rounded-md"></div>
      <div className="skeleton h-12 w-32 rounded-md"></div>
    </div>
  </div>
);

const Banner = () => {
  return (
    <>
      <Suspense fallback={<FallBack />}>
        <BannerContent />
      </Suspense>
    </>
  );
};

export default Banner;
