'use client'


export default function Appointments() {
  const newAppointments = [
    {
      title: "Monthly Check Up",
      date: "January 12, 2026",
      patient: "Maria L. Santos",
      description:
        "Free prenatal check-ups, blood pressure monitoring, and maternal health consultations at your Barangay Health Center.",
    },
    {
      title: "Prenatal Wellness Session",
      date: "January 14, 2026",
      patient: "Ana Mae Dela Cruz",
      description:
        "Health talk for pregnant mothers on proper nutrition, rest, and pregnancy warning signs, led by Barangay Health Workers.",
    },
    {
      title: "Follow-up Visit",
      date: "January 15, 2026",
      patient: "Cristina Reyes",
      description:
        "Routine prenatal check-up and consultation on maternal health.",
    },
  ]

  const earlierAppointments = [
    {
      title: "Emergency Appointment",
      date: "January 10, 2026",
      patient: "Jenny Rose Villanueva",
      time: "03:30 PM",
    },
    {
      title: "Routine Blood Test",
      date: "January 9, 2026",
      patient: "Maria Clara",
      time: "10:00 AM",
    },
    {
      title: "Monthly Check Up",
      date: "January 5, 2026",
      patient: "Ana Mae Dela Cruz",
      time: "09:00 AM",
    },
  ]

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">
        
        {/* New Appointments */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">New</h1>
          <div className="space-y-4">
            {newAppointments.map((appt, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6"
              >
                <h1 className="text-black text-2xl font-bold">{appt.title}</h1>
                <p className="text-sm text-[#3F2870] font-semibold">{appt.date}</p>
                <p className="text-sm text-[#3F2870] font-semibold">Patient: {appt.patient}</p>
                <p className="text-sm text-[#1B1530] opacity-80 mt-1">{appt.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Earlier Appointments */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">Earlier</h1>
          <div className="space-y-4">
            {earlierAppointments.map((appt, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-2xl bg-[#F2EFF9] shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all p-6"
              >
                <h1 className="text-black text-2xl font-bold">{appt.title}</h1>
                <p className="text-sm text-[#3F2870] font-semibold">{appt.date}</p>
                <p className="text-sm text-[#3F2870] font-semibold">Patient: {appt.patient}</p>
                <p className="text-sm text-[#1B1530] opacity-80 mt-1">{appt.time && `Time: ${appt.time}`}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
