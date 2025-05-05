import React from "react";
import {
  Field,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface InputsProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Inputs: React.FC<InputsProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`peer w-full pt-6 outline-none border-y-white font-light rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id] ? "border-rose-400" : " border-slate-300"
        } ${errors[id] ? "focus:border-rose-400" : " focus:border-slate-300"}`}
      />
      <label
        htmlFor={id}
        className={`absolute text-md text-slate-400 duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:translate-x-4`}
      />
    </div>
  );
};

export default Inputs;
