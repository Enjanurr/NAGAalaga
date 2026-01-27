'use client'
import { IoWomanOutline } from "react-icons/io5";

type Props = {
  currentWeek?: number
}

export default function DashboardHeader({ currentWeek = 10 }: Props) {
  const TOTAL_WEEKS = 40
  const progressPercent = Math.min((currentWeek / TOTAL_WEEKS) * 100, 100)

  return (
    <section>
      <div className="flex items-center gap-5 rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all border border-[#3F2870] ">

        {/* Avatar */}
        <div className="flex h-14 w-14 items-center justify-center text-[#3F2870]">
          <IoWomanOutline size={70} />
        </div>

        {/* Text + Progress */}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-[#3F2870]">
            Marhay ng Aga, Ma'am!
          </h1>

          <p className="mt-1 text-sm text-[#3F2870] opacity-80">
            Your {currentWeek}th week progress
          </p>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-4 w-full rounded-full bg-[#E6E1F2] overflow-hidden">
              <div
                className="h-full bg-[#3F2870] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-[#3F2870]">
              {Math.round(progressPercent)}% complete
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
