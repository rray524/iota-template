import React from "react";

interface PropertyDetailItemProps {
  label: string;
  value: string | number;
}

const PropertyDetailItem: React.FC<PropertyDetailItemProps> = ({
  label,
  value,
}) => {
  return (
    <tr className="odd:bg-gray-100 even:bg-white dark:odd:bg-gray-500 dark:even:bg-gray-400">
      <td className="border px-4 py-2 font-semibold">{label}</td>
      <td className="border px-4 py-2">{value}</td>
    </tr>
  );
};

export default PropertyDetailItem;
