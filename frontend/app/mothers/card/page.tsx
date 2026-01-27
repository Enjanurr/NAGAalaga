'use client'

import Headers from "@/components/headers"

export default function Card() {
  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">

        <Headers
          title="Digital Pink Card"
          subtitle="Your complete prenatal record."
          icon="calendar"
        />

        {/* Personal Info */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            Personal Information
          </h1>

          <div className="rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">
            <div className="grid grid-cols-2 gap-y-3 text-sm">

              <p className="font-bold text-[#3F2870]">Name:</p>
              <p className="text-right font-bold text-black">Maria Clara</p>

              <p className="font-bold text-[#3F2870]">Age:</p>
              <p className="text-right font-bold text-black">28</p>

              <p className="font-bold text-[#3F2870]">Birthdate:</p>
              <p className="text-right font-bold text-black">January 20, 2000</p>

              <p className="font-bold text-[#3F2870]">Address:</p>
              <p className="text-right font-bold text-black">
                Naga, Camarines Sur
              </p>

              <p className="font-bold text-[#3F2870]">Weight:</p>
              <p className="text-right font-bold text-black">45kg</p>

              <p className="font-bold text-[#3F2870]">Height:</p>
              <p className="text-right font-bold text-black">169cm</p>

            </div>
          </div>
        </section>

        {/* Checkup History */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            Checkup History
          </h1>

          <div className="space-y-4">

            <div className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all overflow-hidden">

              <div className="flex w-full items-start gap-4 p-6">
                <div className="text-black font-extrabold">
                  Jan 15, 2026
                </div>

                <div>
                  <h1 className="text-base font-bold text-[#3F2870]">
                    Prenatal Blood Pressure & Weight Check
                  </h1>

                  <p className="mt-1 text-sm text-[#1B1530] opacity-80">
                    Barangay Calauag Health Center, Naga City
                  </p>
                </div>
              </div>
            </div>

            <div className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all overflow-hidden">

              <div className="flex w-full items-start gap-4 p-6">
                <div className="text-black font-extrabold">
                  Feb 5, 2026
                </div>

                <div>
                  <h1 className="text-base font-bold text-[#3F2870]">
                    Postpartum Maternal Wellness Check
                  </h1>

                  <p className="mt-1 text-sm text-[#1B1530] opacity-80">
                    Naga City Health Office, Naga City
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Vaccination */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            Vaccination Record
          </h1>

          <div className="space-y-4">

            <div className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all overflow-hidden">

              <div className="flex w-full items-start gap-4 p-6">
                <div className="text-black font-extrabold">
                  Jan 26, 2026
                </div>

                <div>
                  <h1 className="text-base font-bold text-[#3F2870]">
                    BCG (Tuberculosis) Vaccine
                  </h1>

                  <p className="mt-1 text-sm text-[#1B1530] opacity-80">
                    Barangay Concepcion Grande Health Center, Naga City
                  </p>
                </div>
              </div>
            </div>

            <div className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all overflow-hidden">
             

              <div className="flex w-full items-start gap-4 p-6">
                <div className="text-black font-extrabold">
                  March 18, 2026
                </div>

                <div>
                  <h1 className="text-base font-bold text-[#3F2870]">
                    Pentavalent Vaccine (1st Dose)
                  </h1>

                  <p className="mt-1 text-sm text-[#1B1530] opacity-80">
                    Barangay Triangulo Health Center, Naga City
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  )
}
