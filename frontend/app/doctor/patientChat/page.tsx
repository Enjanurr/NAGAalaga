'use client'

import Link from "next/link"
import { FaUser } from "react-icons/fa"

const patients = [
  {
    id: "p1",
    name: "Maria Clara De Los Santos",
    age: 34,
    dob: "November 23, 1988",
    location: "Naga City",
    lastCheckup: "Jan 12, 2026 - Monthly Check Up",
    center: "Barangay Calauag Health Center"
  },
  {
    id: "p2",
    name: "Ana Mae Dela Cruz",
    age: 29,
    dob: "February 10, 1997",
    location: "Naga City",
    lastCheckup: "Feb 5, 2026 - Postpartum Wellness Check",
    center: "Naga City Health Office"
  },
  {
    id: "p3",
    name: "Maria L. Santos",
    age: 31,
    dob: "June 15, 1995",
    location: "Naga City",
    lastCheckup: "Jan 20, 2026 - Prenatal Visit",
    center: "Barangay Concepcion Grande Health Center"
  },
  {
    id: "p4",
    name: "Cristina Reyes",
    age: 27,
    dob: "March 3, 1999",
    location: "Naga City",
    lastCheckup: "March 1, 2026 - Routine Check",
    center: "Barangay Triangulo Health Center"
  }
]

export default function PatientChatInbox() {
  return (
    <main className="min-h-screen px-6 pt-20 bg-[#F2EFF9]">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-[#3F2870]">
          Patient Messages
        </h1>

        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {patients.map(patient => (
            <Link
              key={patient.id}
              href={`/doctor/patientChat/${patient.id}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center text-[#3F2870]">
                <FaUser size={24} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h2 className="font-semibold text-[#3F2870]">{patient.name}</h2>
                <p className="text-sm text-[#3F2870] opacity-80 truncate">
                  {patient.center} • Last Checkup: {patient.lastCheckup}
                </p>
              </div>

              {/* Status */}
              <span className="text-xs text-green-600 font-semibold">Online</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
