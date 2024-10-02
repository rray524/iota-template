import React from "react";

interface PropertyDetails {
  latitude: string;
  longitude: string;
}
const EmbedMap: React.FC<{ details: PropertyDetails }> = ({ details }) => {
  const apiKey = process.env.NEXT_PUBLIC_SITE_KEY!;

  return (
    <div className="embed-map-container">
      <iframe
        width="100%"
        height="520"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${details.latitude},${details.longitude}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EmbedMap;
