'use client'

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { PiWarningCircleLight } from "react-icons/pi";

export default function DashboardDivs(){
  return(
    <section className="py-3 space-y-4">
      
      <div className="flex items-center gap-5 rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex h-14 w-14 items-center justify-center text-[#3F2870]">
          <IoIosCheckmarkCircleOutline size={40} />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-black">
            Vaccination Drive
          </h1>

          <p className="mt-1 text-sm text-[#3F2870] opacity-80">
            Brgy. Minglanilla Hall - Today, 9 am
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex h-14 w-14 items-center justify-center text-[#3F2870]">
          <PiWarningCircleLight size={40} />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-black">
            Prenatal Vitamin
          </h1>

          <p className="mt-1 text-sm text-[#3F2870] opacity-80">
            Visit the health center this week
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex h-14 w-14 items-center justify-center text-[#3F2870]">
          <PiWarningCircleLight size={40} />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-black">
            Upcoming Check-up
          </h1>

          <p className="mt-1 text-sm text-[#3F2870] opacity-80">
            January 20, 2026
          </p>
        </div>
      </div>

    </section>
  )
}
