'use client'

import { FaStethoscope } from "react-icons/fa"
import { useParams } from "next/navigation"

type Doctor = {
  name: string
  hospital: string
}
  
export default function Appointment() {
  const params = useParams()

  // Normalize doctorId (Next returns string | string[] | undefined)
  const doctorId =
    typeof params.doctorId === "string"
      ? params.doctorId
      : params.doctorId?.[0]

  // Dummy doctor data
  const doctors: Record<string, Doctor> = {
    d1: { name: "Dr. Adrian James F. Bona", hospital: "Barangay Calauag Health Center" },
    d2: { name: "Dr. Maria Elena Cruz", hospital: "Barangay Calauag Health Center" },
    d3: { name: "Dr. Jonathan Reyes", hospital: "Naga City Health Office" },
    d4: { name: "Dr. Liza Santos", hospital: "Naga City Health Office" },
    d5: { name: "Dr. Catherine Lim", hospital: "Barangay Concepcion Grande Health Center" },
    d6: { name: "Dr. Mark Dela Rosa", hospital: "Barangay Concepcion Grande Health Center" },
    d7: { name: "Dr. Angela Bautista", hospital: "Barangay Triangulo Health Center" },
    d8: { name: "Dr. Rafael Cruz", hospital: "Barangay Triangulo Health Center" },
  }

  const doctor = doctorId ? doctors[doctorId] : null

  if (!doctor) return <p className="p-6">Doctor not found</p>

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Doctor Info */}
        <section>
          <div className="flex items-center gap-5 rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all border border-[#3F2870]">
            <div className="flex h-14 w-14 items-center justify-center text-[#3F2870]">
              <FaStethoscope size={70} />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-[#3F2870]">
                {doctor.name}
              </h1>
              <p className="mt-1 text-sm text-[#3F2870] opacity-80">
                {doctor.hospital}
              </p>
            </div>
          </div>
        </section>

        {/* Date & Time */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#3F2870] mt-6">
            Select Date & Time
          </h2>

          <select className="w-full rounded-xl bg-[#E6E1F2] p-4 text-sm text-[#1B1530] outline-none focus:ring-2 focus:ring-[#3F2870] cursor-pointer">
            <option>January 30, 2026 - 09:00 AM</option>
            <option>January 30, 2026 - 01:30 PM</option>
            <option>February 1, 2026 - 10:00 AM</option>
            <option>February 1, 2026 - 02:00 PM</option>
          </select>
        </section>

        {/* Reason */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#3F2870] mt-6 mb-3">
            Reason for Appointment
          </h2>

          <textarea
            rows={4}
            placeholder="Enter your reason for the appointment..."
            className="w-full resize-none rounded-xl bg-[#E6E1F2] p-4 text-sm text-[#1B1530] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#3F2870]"
          />
        </section>

        {/* Submit */}
        <section>
          <button className="w-full py-3 rounded-lg bg-[#3F2870] text-white font-bold hover:opacity-90 transition mt-6 cursor-pointer">
            Set Appointment
          </button>
        </section>

      </div>
    </main>
  )
}
