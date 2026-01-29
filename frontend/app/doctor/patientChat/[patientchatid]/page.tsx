'use client'

import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5"

type Patient = {
  name: string
  age: number
  dob: string
  location: string
  lastCheckup: string
  center: string
}

type Message = { id: number; sender: "user" | "doctor"; text: string }

// Dummy patient data
const patients: Record<string, Patient> = {
  p1: {
    name: "Maria Clara De Los Santos",
    age: 34,
    dob: "November 23, 1988",
    location: "Naga City",
    lastCheckup: "Jan 12, 2026 - Monthly Check Up",
    center: "Barangay Calauag Health Center"
  },
  p2: {
    name: "Ana Mae Dela Cruz",
    age: 29,
    dob: "February 10, 1997",
    location: "Naga City",
    lastCheckup: "Feb 5, 2026 - Postpartum Wellness Check",
    center: "Naga City Health Office"
  },
  p3: {
    name: "Maria L. Santos",
    age: 31,
    dob: "June 15, 1995",
    location: "Naga City",
    lastCheckup: "Jan 20, 2026 - Prenatal Visit",
    center: "Barangay Concepcion Grande Health Center"
  },
  p4: {
    name: "Cristina Reyes",
    age: 27,
    dob: "March 3, 1999",
    location: "Naga City",
    lastCheckup: "March 1, 2026 - Routine Check",
    center: "Barangay Triangulo Health Center"
  }
}

export default function DoctorChat() {
  const params = useParams()
  const searchParams = useSearchParams()

  const patientId =
    typeof params.patientchatid === "string" ? params.patientchatid : params.patientchatid?.[0]
  const appointmentDate = searchParams.get("date")
  const patient = patientId ? patients[patientId] : null

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "doctor", text: "Hello! How are you feeling today?" }
  ])

  const bottomRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  if (!patient) return <p className="p-6 text-lg">Patient not found</p>

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), sender: "doctor", text: input }])
    setInput("")
  }

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-4">

        {/* Patient Info */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#F2EFF9] p-5 shadow-md border border-[#3F2870]">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#3F2870]">{patient.name}</h1>
            <p className="text-sm text-[#3F2870] opacity-80">
              {patient.age} years old | {patient.location}
            </p>
            <p className="text-sm text-[#3F2870] opacity-80">{patient.center}</p>
            {appointmentDate && <p className="text-sm text-green-600 mt-1">Appointment: {appointmentDate}</p>}
          </div>
        </div>

        {/* Chat Box */}
        <div className="flex flex-col bg-white rounded-2xl shadow h-[65vh] overflow-hidden">

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === "doctor" ? "justify-start" : "justify-end"}`}>
                <div className={`
                  max-w-[70%] break-words px-4 py-2
                  ${msg.sender === "doctor"
                    ? "bg-[#E6E1F2] text-[#1B1530] rounded-2xl rounded-bl-none"
                    : "bg-[#3F2870] text-white rounded-2xl rounded-br-none"
                  }
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 flex items-center gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
              placeholder="Type your message..."
              className="w-full resize-none rounded-xl bg-[#E6E1F2] p-4 text-sm text-[#1B1530] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#3F2870]"
              rows={2}
            />
            <button
              onClick={sendMessage}
              className="h-10 px-6 bg-[#3F2870] text-white rounded-xl flex items-center gap-2"
            >
              <IoSend size={16} /> Send
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}
