'use client';

import { IconType } from "react-icons";
import clsx from "clsx";

interface ButtonProps {
  label: string,
  icon?: IconType | null,
  disabled?: boolean,
  outline?: boolean,
  secondary?: boolean,
  type?: 'button' | 'submit' | 'reset',
  onClick?: () => void,
  className?: string,
}

export default function Button({
  label,
  icon: Icon,
  disabled,
  outline,
  secondary,
  type,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
      transition
      duration-150
      bg-[#2F80ED]
      hover:bg-[#006eff]
      rounded-[4px]
      px-5
      py-2
      text-xs
      flex
      items-center
      justify-center
      gap-2
      disabled:cursor-not-allowed
      disabled:bg-blue-400
      `,
        outline && 'bg-blue-400 text-cyan-900',
        outline && 'border-2 border-[#2F80ED]',
        outline && 'hover:text-white',
        secondary ? 'bg-transparent text-gray-600' : 'text-white',
        secondary && 'hover:bg-transparent hover:text-gray-400',
        className
      )}
    >
      {Icon && (<Icon size={16} />)}
      {label}
    </button>
  )
}
