'use client';

import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";

import {
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";

interface InputProps {
  id?: string,
  type: HTMLInputTypeAttribute,
  placeholder?: string,
  register?: UseFormRegister<FieldValues>,
  errors?: FieldErrors,
  onChange?: (value: string) => void,

  rules?: RegisterOptions<FieldValues>,
}

export default function Input({
  id,
  placeholder,
  type,
  onChange,
  register,
  errors,
  rules,
}: InputProps) {
  const [inputProps, setInputProps] = useState({});

  useEffect(() => {
    if (id && register) {
      setInputProps(register(id, rules));
    }
  }, [
    id,
    register,
    rules,
  ]);

  const isRequired = () => (id && errors?.[id]?.type === 'required');

  return (
    <div>
      {isRequired() && (
        <p
          className="
          text-red-400 
          text-xs 
          text-right 
          "
        >
          The {id} is required
        </p>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...inputProps}
        onChange={(ev) => onChange && onChange(ev.target.value)}
        className={`
        relative
        transition-all
        ease-in-out
        duration-100
        outline-0
        bg-transparent
        border
        w-full
        p-3
        rounded-lg
        focus:ring-1
        focus:ring-slate-300
        placeholder:select-none
        ${isRequired() && 'border-red-400 focus:ring-red-400'}
        `}
      />
    </div>
  )
}
