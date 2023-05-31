import { useState, useRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, name, pattern, ...restProps }: InputProps) => {
  const [focussed, setFocussed] = useState(false);
  const [valid, setValid] = useState(true);
  const ref = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    setFocussed(false);
    setValid(new RegExp(pattern!).test(ref.current?.value || ""));
  };

  const handleFocus = () => setFocussed(true);

  return (
    <div className="flex flex-col">
      <label
        className="mb-2 text-sm font-medium text-neutral-900"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        ref={ref}
        className={`${
          !valid && !focussed ? "shake border-red-600" : "border-neutral-300"
        } rounded-md border px-3 py-1.5 text-neutral-900 shadow-sm outline-transparent focus:ring focus:ring-green-700`}
        id={name}
        name={name}
        onBlur={handleBlur}
        onFocus={handleFocus}
        pattern={pattern}
        {...restProps}
      />
      {!valid && !focussed && (
        <span className="mt-2 text-sm font-medium text-red-600">{`Invalid ${label.toLowerCase()}`}</span>
      )}
    </div>
  );
};

export default Input;
