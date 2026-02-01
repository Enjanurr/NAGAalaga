'use client'

import Link from "next/link"

export default function Hospitals() {
  const hospitals = [
    {
      id: "1",
      name: "Abella Barangay Health Station",
      address: "Zone 4 Urban, Abella, Naga City",
      description: "Women's Health Services (VIA, Breast Cancer Screening) - Quarterly",
    },
    {
      id: "2",
      name: "Carolina Barangay Health Station",
      address: "Zone 3 Carolina, Naga City",
      description: "Teenage Pregnancy & Adolescent Counseling  - Every Friday",
    },
    {
      id: "3",
      name: "Balatas Barangay Health Station",
      address: "Zone 3 Kayanga Street, Balatas, Naga City",
      description: "Adolescent Health Services - every Tuesday and Thursday",
    },
    {
      id: "4",
      name: "Concepcion Grande Barangay Health Station",
      address: "Zone 4 Barangay Hall,Concepcion Grande, Naga City",
      description: "Adolescent Health Services - every 1st Friday of the Month",
    }
  ]

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">

        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">Available Hospitals</h1>
          <div className="space-y-4 cursor-pointer">
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
