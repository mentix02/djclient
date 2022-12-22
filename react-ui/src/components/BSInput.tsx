import { FC, FocusEvent, ChangeEvent } from "react";

import type { ValueField } from "@/services/api/types/auth";

type BSInputProps = {
  id: string;
  label: string;
  value: ValueField;
  required?: boolean;
  autoFocus?: boolean;
  type?: "email" | "text" | "password";
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const BSInput: FC<BSInputProps> = ({
  id,
  value,
  label,
  onBlur,
  onChange,
  type = "text",
  required = true,
  autoFocus = false,
}: BSInputProps) => (
  <div className="form-floating">
    <input
      id={id}
      name={id}
      type={type}
      onBlur={onBlur}
      autoComplete={id}
      value={value.value}
      required={required}
      onChange={onChange}
      placeholder={label}
      autoFocus={autoFocus}
      className={`form-control ${value.errors.length > 0 && "is-invalid"}`}
    />
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    {value.errors.length > 0 && (
      <ul className="invalid-feedback mb-0">
        {value.errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )}
  </div>
);

export default BSInput;
