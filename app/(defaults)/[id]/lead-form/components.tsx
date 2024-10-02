export const Input = ({
  name,
  register,
  error,
  placeHolder,
  isTextArea = false,
}: {
  name: string;
  placeHolder: string;
  register: any;
  error?: any;
  isTextArea?: boolean;
}) => {
  if (isTextArea) {
    return (
      <>
        <textarea
          {...register}
          className={`w-full px-3 py-2 mb-0 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
            error ? "border-red-500" : ""
          }`}
          placeholder={placeHolder}
          name={name}
        />
        {error?.message && (
          <span className="text-red-500 text-sm">{error?.message}</span>
        )}
      </>
    );
  }
  return (
    <>
      <input
        {...register}
        className={`w-full px-3 py-2 mb-0 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeHolder}
        name={name}
      />
      {error?.message && (
        <span className="text-red-500 text-sm">{error?.message}</span>
      )}
    </>
  );
};
