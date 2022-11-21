import { InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  fieldname: string;
  rules?: object;
  register: UseFormRegister<FieldValues>;
}

export function Input({
  text,
  fieldname,
  register,
  rules,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col py-3">
      <label htmlFor={fieldname} className="font-medium">
        {text}
      </label>
      <input
        className="h-10 w-72 px-2 bg-transparent border-b border-solid border-black outline-none"
        id={fieldname}
        {...register(fieldname, { ...rules })}
        {...props}
      />
    </div>
  );
}
