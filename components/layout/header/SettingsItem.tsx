'use client';

import { IconType } from "react-icons";

interface SettingsItemProps {
  label: string,
  icon: IconType,
  onClick: () => void,
  className?: string,
}

export default function SettingsItem({
  label,
  icon: Icon,
  onClick,
  className,
}: SettingsItemProps) {
  return (
    <div
      onClick={onClick}
      className={`
      flex
      items-center
      space-x-2
      text-[#4F4F4F]
      hover:bg-[#F2F2F2]
      rounded-md
      py-2
      px-3
      cursor-pointer
      ${className}
      `}
    >
      <Icon size={24} />
      <p
        className="
        truncate
        "
      >
        {label}
      </p>
    </div>
  )
}
