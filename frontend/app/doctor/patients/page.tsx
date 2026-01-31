'use client'

import Link from "next/link"

export default function Patients() {
  const patients = [
  
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
             <div className="flex w-full items-start gap-4 p-6">

      {/* Left date */}
      <div className="text-black font-extrabold whitespace-nowrap">
       Jan 12, 2026 
      </div>

      {/* Right content */}
     <Link href={"/doctor/demo/"}> <div className="flex-1">

        <h1 className="text-base font-bold text-[#3F2870]">
          Maria Clara  — Age 34
        </h1>

        <p className="mt-1 text-sm text-[#1B1530] opacity-80">
          Jan 12, 2026 - Monthly Check Up
        </p>

        <p className="mt-1 text-xs text-[#1B1530] opacity-70">
          Barangay Calauag Health Center, Naga City
        </p>

        <p className="mt-1 text-xs opacity-60">
          DOB: February 10, 1997
        </p>

      </div></Link>
    </div>
          {patients.map((p) => (
  <Link
    key={p.id}
    href={`/doctor/patients/${p.id}`}
    className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all"
  >
    <div className="flex w-full items-start gap-4 p-6">

      {/* Left date */}
      <div className="text-black font-extrabold whitespace-nowrap">
        {p.lastCheckup.split("-")[0]}
      </div>

      {/* Right content */}
      <div className="flex-1">

        <h1 className="text-base font-bold text-[#3F2870]">
          {p.name} — Age {p.age}
        </h1>

        <p className="mt-1 text-sm text-[#1B1530] opacity-80">
          {p.lastCheckup.split("-")[1]}
        </p>

        <p className="mt-1 text-xs text-[#1B1530] opacity-70">
          {p.center}, {p.location}
        </p>

        <p className="mt-1 text-xs opacity-60">
          DOB: {p.dob}
        </p>

      </div>
    </div>
  </Link>
))}

          </div>
        </section>

      </div>
    </main>
  )
}
