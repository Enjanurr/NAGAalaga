'use client'

import { useParams } from "next/navigation"
import Link from "next/link"

export default function PatientPage() {
  const { id } = useParams()
  
  // Dummy data

    // Add more patients if needed
  const patients = [
  {
    id: "1",
    name: "Maria Clara De Los Santos",
    age: 34,
    dob: "November 23, 1988",
    location: "Naga City",
    lastCheckup: "Jan 12, 2026 - Monthly Check Up",
    center: "Barangay Calauag Health Center",
    checkups: [
      { date: "Jan 12, 2026", title: "Monthly Check Up", center: "Barangay Calauag Health Center" },
      { date: "Feb 15, 2026", title: "Prenatal Visit", center: "Barangay Concepcion Grande Health Center" }
    ],
    vaccinations: [
      { date: "Jan 26, 2026", title: "BCG (Tuberculosis) Vaccine", center: "Barangay Concepcion Grande Health Center" },
      { date: "March 18, 2026", title: "Pentavalent Vaccine (1st Dose)", center: "Barangay Triangulo Health Center" }
    ]
  },
  {
    id: "2",
    name: "Ana Mae Dela Cruz",
    age: 29,
    dob: "February 10, 1997",
    location: "Naga City",
    lastCheckup: "Feb 5, 2026 - Postpartum Wellness Check",
    center: "Naga City Health Office",
    checkups: [
      { date: "Feb 5, 2026", title: "Postpartum Wellness Check", center: "Naga City Health Office" }
    ],
    vaccinations: [
      { date: "Jan 26, 2026", title: "Hepatitis B Vaccine", center: "Barangay Concepcion Grande Health Center" }
    ]
  },
  {
    id: "3",
    name: "Maria L. Santos",
    age: 31,
    dob: "June 15, 1995",
    location: "Naga City",
    lastCheckup: "Jan 20, 2026 - Prenatal Visit",
    center: "Barangay Concepcion Grande Health Center",
    checkups: [
      { date: "Jan 20, 2026", title: "Prenatal Visit", center: "Barangay Concepcion Grande Health Center" },
      { date: "Feb 20, 2026", title: "Ultrasound Scan", center: "Naga City Health Office" }
    ],
    vaccinations: [
      { date: "Feb 10, 2026", title: "Tdap Vaccine", center: "Barangay Triangulo Health Center" },
      { date: "March 5, 2026", title: "Influenza Vaccine", center: "Barangay Triangulo Health Center" }
    ]
  },
  {
    id: "4",
    name: "Cristina Reyes",
    age: 27,
    dob: "March 3, 1999",
    location: "Naga City",
    lastCheckup: "March 1, 2026 - Routine Check",
    center: "Barangay Triangulo Health Center",
    checkups: [
      { date: "March 1, 2026", title: "Routine Check", center: "Barangay Triangulo Health Center" },
      { date: "March 15, 2026", title: "Blood Pressure Check", center: "Naga City Health Office" }
    ],
    vaccinations: [
      { date: "Jan 30, 2026", title: "Hepatitis B Vaccine", center: "Barangay Concepcion Grande Health Center" },
      { date: "March 10, 2026", title: "MMR Vaccine", center: "Barangay Triangulo Health Center" }
    ]
  }
];


  const patient = patients.find((p) => p.id === id)

  if (!patient) return <p className="p-6 text-red-500">Patient not found</p>

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">

        {/* Back Link */}
        <Link href="/doctor/patients" className="text-[#3F2870] font-semibold hover:underline">
          &larr; Back to Patients
        </Link>

        {/* Patient Info */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">{patient.name}</h1>

          <div className="rounded-2xl bg-[#F2EFF9] p-6 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <p className="font-bold text-[#3F2870]">Age:</p>
              <p className="text-right font-bold text-black">{patient.age}</p>

              <p className="font-bold text-[#3F2870]">Date of Birth:</p>
              <p className="text-right font-bold text-black">{patient.dob}</p>

              <p className="font-bold text-[#3F2870]">Location:</p>
              <p className="text-right font-bold text-black">{patient.location}</p>
            </div>
          </div>
        </section>

        {/* Checkup History */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">Checkup History</h1>

          <div className="space-y-4">
            {patient.checkups.map((c, idx) => (
              <div
                key={idx}
                className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="w-2 bg-[#009A00]" />
                <div className="flex w-full items-start gap-4 p-5">
                  <div className="text-black font-extrabold">{c.date}</div>
                  <div>
                    <h2 className="text-base font-bold text-[#3F2870]">{c.title}</h2>
                    <p className="mt-1 text-sm text-[#1B1530] opacity-80">{c.center}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vaccination History */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">Vaccination Record</h1>

          <div className="space-y-4">
            {patient.vaccinations.map((v, idx) => (
              <div
                key={idx}
                className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="w-2 bg-[#009A00]" />
                <div className="flex w-full items-start gap-4 p-5">
                  <div className="text-black font-extrabold">{v.date}</div>
                  <div>
                    <h2 className="text-base font-bold text-[#3F2870]">{v.title}</h2>
                    <p className="mt-1 text-sm text-[#1B1530] opacity-80">{v.center}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
