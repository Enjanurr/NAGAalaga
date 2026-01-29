'use client'

import Link from "next/link"
import { useParams } from "next/navigation"

export default function Doctors() {
  // Dummy doctors data mapped by hospital ID
  const doctorsByHospital: Record<string, any[]> = {
    "1": [
      { id: "d1", name: "Dr. Adrian James F. Bona", specialization: "Obstetrics & Gynecology" },
      { id: "d2", name: "Dr. Maria Elena Cruz", specialization: "Maternal Health" },
    ],
    "2": [
      { id: "d3", name: "Dr. Jonathan Reyes", specialization: "Postpartum Care" },
      { id: "d4", name: "Dr. Liza Santos", specialization: "Pediatrics & Maternal" },
    ],
    "3": [
      { id: "d5", name: "Dr. Catherine Lim", specialization: "Prenatal Care" },
      { id: "d6", name: "Dr. Mark Dela Rosa", specialization: "Obstetrics" },
    ],
    "4": [
      { id: "d7", name: "Dr. Angela Bautista", specialization: "Maternal Health" },
      { id: "d8", name: "Dr. Rafael Cruz", specialization: "General Checkup" },
    ]
  }

  // Get the hospitalId from the route
  const params = useParams()
 const hospitalId = params.hospitalId as string


  const doctors = doctorsByHospital[hospitalId] || []

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            Available Doctors
          </h1>

          <div className="space-y-4 cursor-pointer">
            {doctors.map((doc) => (
              <Link
                key={doc.id}
                href={`/mothers/selectHospital/${hospitalId}/setAppointment/${doc.id}`}
                className="flex flex-col rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6 cursor-pointer"
              >
                <h1 className="text-black text-2xl font-bold">{doc.name}</h1>
                <p className="text-sm text-[#3F2870] font-semibold">{doc.specialization}</p>
                <p className="text-sm text-[#1B1530] opacity-80 mt-1">
                  Click to set an appointment with this doctor
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
