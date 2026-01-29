'use client'

import { BiCalendar, BiHeart } from "react-icons/bi"
import { FaStethoscope } from "react-icons/fa"

export default function Dashboard() {
  return (
       <main className="min-h-screen bg-[#F2EFF9] px-6 pt-15">
     <div className="mx-30">

        {/* Doctor Header */}
        <section className="">
          <div className="flex items-center gap-5 rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">
            {/* Avatar */}
            <div className="flex h-14 w-14 items-center justify-center text-[#3F2870]">
              <FaStethoscope size={70} />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-[#3F2870]">
                Marhay ng Aga, Doc!
              </h1>
              <p className="mt-1 text-sm text-[#3F2870] opacity-80">
                January 26, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <h1 className="text-2xl font-semibold text-[#3F2870] mt-6">
          Quick Actions
        </h1>

        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">

          <div className="flex items-center gap-4 rounded-2xl bg-[#F2EFF9] p-6 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">
            <div className="flex h-12 w-12 items-center justify-center text-[#3F2870]">
              <BiCalendar size={24} />
            </div>

            <div>
              <h2 className="font-semibold text-[#3F2870]">Next Checkup</h2>
              <p className="text-sm text-[#3F2870] opacity-80">
                January 20, 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-[#F2EFF9] p-6 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">
            <div className="flex h-12 w-12 items-center justify-center text-[#3F2870]">
              <BiHeart size={24} />
            </div>

            <div>
              <h2 className="font-semibold text-[#3F2870]">Health Log</h2>
              <p className="text-sm text-[#3F2870] opacity-80">
                Normal
              </p>
            </div>
          </div>

        </section>

        {/* Barangay Notifications */}
        <h1 className="text-2xl font-semibold text-[#3F2870] mt-6">
          Barangay Notifications
        </h1>

        <div className="space-y-4">
          {[
            { date: "Jan 12", title: "Monthly Check Up", info: "Patient Name: Maria Clara Time: 01:30 PM" },
            { date: "Jan 13", title: "Monthly Check Up", info: "Patient Name: Maria L. Santos Time: 09:00 AM" },
            { date: "Jan 14", title: "Emergency Appointment", info: "Patient Name: Ana Mae Dela Cruz Time: 10:30 AM" },
          ].map((alert) => (
            <div
              key={alert.date + alert.title}
              className="flex items-center gap-5 rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex h-14 w-14 items-center justify-center text-black font-extrabold">
                {alert.date}
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-extrabold text-black">
                  {alert.title}
                </h1>
                <p className="mt-1 text-sm text-black font-bold opacity-80">
                  {alert.info}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
