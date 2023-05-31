interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, name, pattern, ...restProps }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label
        className="mb-2 text-sm font-medium text-neutral-900"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="rounded-md border px-3 py-1.5 text-neutral-900 shadow-sm outline-transparent focus:ring focus:ring-green-700"
        id={name}
        name={name}
        pattern={pattern}
        {...restProps}
      />
      {/* <span className="mt-2 text-sm font-medium text-red-600">Error!</span> */}
    </div>
  );
};

export default Input;
