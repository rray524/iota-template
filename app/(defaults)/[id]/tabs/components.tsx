import { DetailItemProps } from "./types";

export const Tab = ({
  children,
  active,
}: {
  children: JSX.Element;
  active: boolean;
}) => {
  return (
    <li
      className={`${
        active
          ? "bg-white border-t border-r border-l -mb-px"
          : "dark:text-white"
      } px-4 text-gray-800 font-semibold py-2 rounded-t`}
    >
      {children}
    </li>
  );
};

export const TabContent = ({
  children,
  active,
}: {
  children: JSX.Element;
  active: boolean;
}) => {
  return <div className={`p-4  ${active ? "" : "hidden"}`}>{children}</div>;
};

export const DetailsPara = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <p className="dark:text-gray-400">
      <span className="font-bold underline">{label}:</span> {value}
    </p>
  );
};

export const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => {
  return (
    <tr className="odd:bg-gray-100 even:bg-white dark:odd:bg-gray-500 dark:even:bg-gray-400">
      <td className="border px-4 py-2 font-semibold">{label}</td>
      <td className="border px-4 py-2">{value}</td>
    </tr>
  );
};
