'use client'

import Headers from "@/components/headers"

export default function Alerts() {
  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">

        <Headers
          title="What's new?"
          subtitle="Stay updated with health programs."
          icon="bell"
        />

        {/* Today */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            Today
          </h1>

          <div className="space-y-4">

            <div className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-black text-2xl font-bold">
                  Barangay Health Center
                </h1>
                <h2 className="text-base font-extrabold text-[#3F2870]">
                  Maternal Check-up Day
                </h2>
                <p className="text-sm text-[#1B1530] opacity-80">
                  Free prenatal check-ups, blood pressure monitoring, and maternal health consultations at your Barangay Health Center.
                </p>
              </div>
            </div>

            <div className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-black text-2xl font-bold">
                  Barangay Hall
                </h1>
                <h2 className="text-base font-extrabold text-[#3F2870]">
                  Prenatal Wellness Session
                </h2>
                <p className="text-sm text-[#1B1530] opacity-80">
                  Health talk for pregnant mothers on proper nutrition, rest, and pregnancy warning signs, led by Barangay Health Workers.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Upcoming Events */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            Upcoming Events
          </h1>

          <div className="space-y-4">

            <div className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-black text-2xl font-bold">
                  Barangay Maternal Check-up Day (February 15, 2026)
                </h1>
                <p className="text-sm text-[#1B1530]">
                  Free prenatal check-ups, blood pressure screening, and basic health consultations for pregnant mothers at selected Barangay Health Centers across Naga City.
                </p>
                <p className="text-sm text-[#1B1530] opacity-80">
                  in 2 weeks
                </p>
              </div>
            </div>

            <div className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-black text-2xl font-bold">
                  Citywide Infant Vaccination Drive (March 04, 2026)
                </h1>
                <p className="text-sm text-[#1B1530]">
                  A scheduled vaccination day for infants and newborns at Naga City health facilities, with on-site guidance from Barangay Health Workers on proper child care and nutrition.
                </p>
                <p className="text-sm text-[#1B1530] opacity-80">
                  in 2 weeks
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  )
}
