import CommonListing from "./listings-common";
import PropertyCard from "@/components/cards/property-card";

export default async function NewListing() {
  return (
    <>
      <CommonListing
        ItemComponent={PropertyCard}
        apiUrl="properties"
        title="New Listing"
        status="new"
      />
    </>
  );
}
