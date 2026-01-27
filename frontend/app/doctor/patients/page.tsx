'use client'

import Link from "next/link"

export default function Patients() {
  const patients = [
    {
      id: "1",
      name: "Maria Clara De Los Santos",
      age: 34,
      dob: "November 23, 1988",
      location: "Naga City",
      lastCheckup: "Jan 12, 2026 - Monthly Check Up",
      center: "Barangay Calauag Health Center"
    },
    {
      id: "2",
      name: "Ana Mae Dela Cruz",
      age: 29,
      dob: "February 10, 1997",
      location: "Naga City",
      lastCheckup: "Feb 5, 2026 - Postpartum Wellness Check",
      center: "Naga City Health Office"
    },
    {
      id: "3",
      name: "Maria L. Santos",
      age: 31,
      dob: "June 15, 1995",
      location: "Naga City",
      lastCheckup: "Jan 20, 2026 - Prenatal Visit",
      center: "Barangay Concepcion Grande Health Center"
    },
    {
      id: "4",
      name: "Cristina Reyes",
      age: 27,
      dob: "March 3, 1999",
      location: "Naga City",
      lastCheckup: "March 1, 2026 - Routine Check",
      center: "Barangay Triangulo Health Center"
    }
  ];

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">

        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            Patients ({patients.length})
          </h1>

          <div className="space-y-4">
            {patients.map((p) => (
              <Link
                key={p.id}
                href={`/doctor/patients/${p.id}`}
                className="flex flex-col rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6"
              >
                {/* Top row: Name & Age */}
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-black">{p.name}</h2>
                  <span className="text-sm font-semibold text-[#3F2870]">
                    Age: {p.age}
                  </span>
                </div>

                {/* Location & DOB */}
                <p className="text-sm text-[#1B1530] opacity-80 mb-2">
                  DOB: {p.dob} | Location: {p.location}
                </p>

                {/* Last Checkup */}
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <h3 className="text-sm font-bold text-[#3F2870]">{p.lastCheckup}</h3>
                  <p className="text-xs text-[#1B1530] opacity-80">{p.center}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
