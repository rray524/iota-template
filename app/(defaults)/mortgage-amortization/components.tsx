export const Input = ({
  type,
  name,
  register,
  error,
  label,
}: {
  type: string;
  name: string;
  label: string;
  register: any;
  error?: any;
}) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 font-semibold">
        {label}
      </label>
      <div className="relative mt-1">
        {(name === "askingPrice" || name === "downpayment") && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
        )}
        <input
          {...register}
          name={name}
          type={type}
          className={`border border-gray-300 p-2 w-full rounded ${
            name === "askingPrice" || name === "downpayment" ? "pl-6" : ""
          }`}
        />
      </div>
      {error?.message && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
