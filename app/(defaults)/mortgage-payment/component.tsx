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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        {(name === "mortgageAmount" || name === "askingPrice") && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
        )}

        <input
          {...register}
          name={name}
          type={type}
          className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ${
            name === "mortgageAmount" || name === "askingPrice" ? "pl-6" : ""
          }`}
          required
        />
      </div>
      {error?.message && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
