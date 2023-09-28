'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string,
  icon?: IconType,
  type?: 'button' | 'submit' | 'reset',
  onClick: () => void,
  className?: string,
}

export default function Button({
  label,
  icon: Icon,
  type,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
      transition
      duration-150
      bg-[#2F80ED]
      hover:bg-[#006eff]
      text-white
      rounded-[4px]
      px-5
      py-2
      text-xs
      flex
      items-center
      justify-center
      gap-2
      ${className}
      `}
    >
      {Icon && (
        <Icon size={16} />
      )}
      {label}
    </button>
  )
}
