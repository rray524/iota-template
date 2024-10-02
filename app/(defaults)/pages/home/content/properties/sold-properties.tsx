import CommonListing from "./listings-common";
import PropertyCard from "@/components/cards/property-card";

export default async function SoldLProperties() {
  return (
    <>
      <CommonListing
        ItemComponent={PropertyCard}
        apiUrl="properties"
        title="Sold Properties"
        status="sold"
      />
    </>
  );
}
