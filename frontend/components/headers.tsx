'use client'

import { FaRegHeart } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";

type HeaderProps = {
  title: string
  subtitle: string
  icon?: "heart" | "calendar" | "bell"
}

export default function Headers({
  title,
  subtitle,
  icon = "heart",
}: HeaderProps) {

  const renderIcon = () => {
    switch (icon) {
      case "calendar":
        return <FaRegCalendar size={32} />
      case "bell":
        return <FaRegBell size={32} />
      default:
        return <FaRegHeart size={32} />
    }
  }

  return (
    <section>
      <div className="flex items-center gap-5 rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">

        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center text-[#3F2870]">
          {renderIcon()}
        </div>

        {/* Text */}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-[#3F2870]">
            {title}
          </h1>

          <p className="mt-1 text-sm text-[#3F2870] opacity-80">
            {subtitle}
          </p>
        </div>

      </div>
    </section>
  )
}
