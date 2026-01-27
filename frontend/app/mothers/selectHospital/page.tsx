'use client'

import Link from "next/link"

export default function Hospitals() {
  const hospitals = [
    {
      id: "1",
      name: "Barangay Calauag Health Center",
      address: "Naga City, Camarines Sur",
      description: "Provides prenatal check-ups, maternal health consultations, and vaccination services.",
    },
    {
      id: "2",
      name: "Naga City Health Office",
      address: "Naga City, Camarines Sur",
      description: "Offers postpartum wellness programs and routine maternal check-ups.",
    },
    {
      id: "3",
      name: "Barangay Concepcion Grande Health Center",
      address: "Naga City, Camarines Sur",
      description: "Prenatal and postnatal care, immunizations, and health education for mothers.",
    },
    {
      id: "4",
      name: "Barangay Triangulo Health Center",
      address: "Naga City, Camarines Sur",
      description: "Routine check-ups, blood pressure monitoring, and infant vaccination services.",
    }
  ]

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">

        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">Available Hospitals</h1>
          <div className="space-y-4">
            {hospitals.map((hospital) => (
              <Link
                key={hospital.id}
                href={`/mothers/selectHospital/${hospital.id}`} // Dynamic route for doctors
                className="flex flex-col rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6 cursor-pointer"
              >
                <h1 className="text-black text-2xl font-bold">{hospital.name}</h1>
                <p className="text-sm text-[#3F2870] font-semibold">{hospital.address}</p>
                <p className="text-sm text-[#1B1530] opacity-80 mt-1">{hospital.description}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
