"use client";
import { truncateText } from "@/helpers/utils";
import { PropertyDetails } from "@/types/property-types";
import React, { useState } from "react";
import { DetailItem, Tab, TabContent } from "./components";
import { formatPrice } from "../../mortgage-amortization/utlils";
interface PropertyCardProps {
  property: PropertyDetails;
}

const Tabs: React.FC<PropertyCardProps> = ({ property }) => {
  const [activeTab, setActiveTab] = useState("general");

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  return (
    <div className="rounded border w-full mx-auto mt-4 max-h-[490px] max-[639px]:max-h-[830px]">
      <ul
        id="tabs"
        className="flex flex-col sm:flex-row pt-2 px-1 w-full border-b"
      >
        <Tab active={activeTab === "general"}>
          <a
            href="#general"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("general");
            }}
          >
            General Details
          </a>
        </Tab>
        <Tab active={activeTab === "interior"}>
          <a
            href="#interior"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("interior");
            }}
          >
            Room Interior
          </a>
        </Tab>
        <Tab active={activeTab === "exterior"}>
          <a
            href="#exterior"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("exterior");
            }}
          >
            Exterior
          </a>
        </Tab>
        <Tab active={activeTab === "utilities"}>
          <a
            href="#utilities"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("utilities");
            }}
          >
            Utilities
          </a>
        </Tab>
      </ul>

      {/* Tab Contents */}
      <div id="tab-contents">
        <TabContent active={activeTab === "general"}>
          <>
            <table className="min-w-full bg-white">
              <tbody>
                <DetailItem
                  label="Price"
                  value={`$${formatPrice(property?.general_details.price)}`}
                />
                <DetailItem
                  label="Taxes"
                  value={`$${formatPrice(property.general_details.taxes)}`}
                />
                <DetailItem
                  label="Address"
                  value={property.general_details.address}
                />
                <DetailItem
                  label="Lot Size"
                  value={property.general_details.lot_size}
                />
                <DetailItem
                  label="Directions"
                  value={property.general_details.directions}
                />
                <DetailItem
                  label="Details"
                  value={truncateText(property.property_description, 290)}
                />
              </tbody>
            </table>
          </>
        </TabContent>
        <TabContent active={activeTab === "interior"}>
          <>
            <table className="min-w-full bg-white">
              <tbody>
                <DetailItem
                  label="Rooms"
                  value={property.room_interior.rooms}
                />
                <DetailItem
                  label="Rooms Plus"
                  value={property.room_interior.rooms_plus}
                />
                <DetailItem
                  label="Bedrooms"
                  value={property.room_interior.bedrooms}
                />
                <DetailItem
                  label="Bedrooms Plus"
                  value={property.room_interior.bedrooms_plus}
                />
                <DetailItem
                  label="Kitchens"
                  value={property.room_interior.kitchens}
                />
                <DetailItem
                  label="Family Room"
                  value={property.room_interior.family_room}
                />
                <DetailItem
                  label="Basement"
                  value={property.room_interior.basement}
                />
              </tbody>
            </table>
          </>
        </TabContent>
        <TabContent active={activeTab === "exterior"}>
          <>
            <table className="min-w-full bg-white">
              <tbody>
                <DetailItem
                  label="Property Type"
                  value={property.exterior.property_type}
                />
                <DetailItem label="Style" value={property.exterior.style} />
                <DetailItem
                  label="Exterior"
                  value={property.exterior.exterior}
                />
                <DetailItem
                  label="Garage Type"
                  value={property.exterior.garage_type}
                />
                <DetailItem
                  label="Drive Parking Spaces"
                  value={property.exterior.drive_parking_spaces}
                />
                <DetailItem label="Pool" value={property.exterior.pool} />
              </tbody>
            </table>
          </>
        </TabContent>
        <TabContent active={activeTab === "utilities"}>
          <>
            <table className="min-w-full bg-white">
              <tbody>
                <DetailItem
                  label="Fireplace/Stove"
                  value={property.utilities.fireplace_stove}
                />
                <DetailItem
                  label="Heat Source"
                  value={property.utilities.heat_source}
                />
                <DetailItem
                  label="Heat Type"
                  value={property.utilities.heat_type}
                />
                <DetailItem
                  label="Central Air Conditioning"
                  value={property.utilities.central_air_conditioning}
                />
                <DetailItem
                  label="Laundry Level"
                  value={property.utilities.laundry_level}
                />
                <DetailItem label="Sewers" value={property.utilities.sewers} />
                <DetailItem label="Water" value={property.utilities.water} />
              </tbody>
            </table>
          </>
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
