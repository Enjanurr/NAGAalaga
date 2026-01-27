'use client'

import Headers from "@/components/headers"

export default function Notification() {
  const newNotifications = [
    {
      title: "Appointment Request",
      subtitle: "January 12, 2026 Patient: Maria L. Santos",
      description: "Free prenatal check-ups, blood pressure monitoring, and maternal health consultations at your Barangay Health Center.",
    },
    {
      title: "Vaccination Drive",
      subtitle: "Prenatal Wellness Session",
      description: "Health talk for pregnant mothers on proper nutrition, rest, and pregnancy warning signs, led by Barangay Health Workers.",
    },
    {
      title: "Follow-up Visit",
      subtitle: "January 13, 2026 Patient: Ana Mae Dela Cruz",
      description: "Routine prenatal check-up and consultation on maternal health.",
    },
  ]

  const earlierNotifications = [
    {
      title: "Monthly Checkup",
      subtitle: "Message from patient",
      time: "in 2 weeks",
    },
    {
      title: "Emergency Appointment",
      subtitle: "Patient: Ms. Jenny Rose Villanueva Time: 03:30 PM",
      time: "in 2 weeks",
    },
    {
      title: "Routine Blood Test",
      subtitle: "Patient: Cristina Reyes Time: 10:00 AM",
      time: "last week",
    },
  ]

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">

        {/* New Notifications */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">New</h1>
          <div className="space-y-4">
            {newNotifications.map((n, idx) => (
              <div
                key={idx}
                className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="text-black text-2xl font-bold">{n.title}</h1>
                  <h2 className="text-base font-extrabold text-[#3F2870]">{n.subtitle}</h2>
                  <p className="text-sm text-[#1B1530] opacity-80">{n.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Earlier Notifications */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">Earlier</h1>
          <div className="space-y-4">
            {earlierNotifications.map((n, idx) => (
              <div
                key={idx}
                className="flex rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="text-black text-2xl font-bold">{n.title}</h1>
                  <p className="text-sm text-[#1B1530]">{n.subtitle}</p>
                  <p className="text-sm text-[#1B1530] opacity-80">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
