import React from "react";
import PropertyDetailItem from "./component";
import { AtAGlance } from "@/types/property-types";

interface PropertyCardProps {
  details: AtAGlance;
}

const AtAGlanceComponent = ({ details }: PropertyCardProps) => {
  return (
    <div className="border rounded-lg p-2 w-full mx-auto mt-3 bg-white dark:bg-gray-300 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 pt-3">
        At a Glance:
      </h2>
      <table className="w-full text-left table-auto border-collapse">
        <tbody>
          <PropertyDetailItem label="Type" value={details.type} />
          <PropertyDetailItem label="Area" value={details.area} />
          <PropertyDetailItem
            label="Municipality"
            value={details.municipality}
          />
          <PropertyDetailItem
            label="Neighbourhood"
            value={details.neighborhood}
          />

          <PropertyDetailItem label="Beds" value={details.beds} />
          <PropertyDetailItem label="Baths" value={details.baths} />
        </tbody>
      </table>
    </div>
  );
};

export default AtAGlanceComponent;
