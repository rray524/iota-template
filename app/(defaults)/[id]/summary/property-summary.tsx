import React from "react";
import { PropertyDetails } from "@/types/property-types";
import { formatPrice } from "../../mortgage-amortization/utlils";

interface PropertyCardProps {
  details: PropertyDetails;
}

const PropertySummary: React.FC<PropertyCardProps> = ({ details }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-start gap-4 p-4 rounded-sm bg-gray-100 mt-7 w-[99.5%] mx-auto shadow-lg">
      <span className="text-orange-500 font-semibold">
        {`$${formatPrice(details?.general_details.price)}`}
      </span>
      <span className="text-blue-600 font-medium">
        Property Status - {details?.category}
      </span>
      <span className="text-gray-700">Listing ID: {details?.listing_id}</span>
      <span className="text-gray-700 flex gap-2 items-center">
        Available for:{" "}
        <div
          className={` ${
            details.category === "new" ? " bg-green-500" : "bg-yellow-500"
          } text-white p-1`}
        >
          {details?.available_for}
        </div>
      </span>
    </div>
  );
};

export default PropertySummary;
