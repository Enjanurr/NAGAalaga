'use client'

import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5"

type Doctor = { name: string; hospital: string }
type Message = { id: number; sender: "user" | "doctor"; text: string }

const doctors: Record<string, Doctor> = {
  d1: { name: "Dr. Adrian James F. Bona", hospital: "Barangay Calauag Health Center" },
  d2: { name: "Dr. Maria Elena Cruz", hospital: "Barangay Calauag Health Center" },
  d3: { name: "Dr. Jonathan Reyes", hospital: "Naga City Health Office" },
  d4: { name: "Dr. Liza Santos", hospital: "Naga City Health Office" },
}

export default function ChatPage() {
  const params = useParams()
  const searchParams = useSearchParams()

  const doctorId = typeof params.chatId === "string" ? params.chatId : params.chatId?.[0]
  const appointmentDate = searchParams.get("date")
  const doctor = doctorId ? doctors[doctorId] : null

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "doctor", text: "Hello! How can I help you today?" }
  ])

  const bottomRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  if (!doctor) return <p className="p-6 text-lg">Doctor not found</p>

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), sender: "user", text: input }])
    setInput("")
  }

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-4">

        {/* Doctor Info */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#F2EFF9] p-5 shadow-md border border-[#3F2870]">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#3F2870]">{doctor.name}</h1>
            <p className="text-sm text-[#3F2870] opacity-80">{doctor.hospital}</p>
            {appointmentDate && <p className="text-sm text-green-600 mt-1">Appointment: {appointmentDate}</p>}
          </div>
        </div>

        {/* Chat Box */}
        <div className="flex flex-col bg-white rounded-2xl shadow h-[65vh] overflow-hidden">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-3">

           {messages.map(msg => (
  <div
    key={msg.id}
    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`
        max-w-[70%] break-words  py-2 
        rounded-2xl
        ${msg.sender === "user"
          ? "bg-[#3F2870] text-white rounded-br-none"
          : "bg-[#E6E1F2] text-[#1B1530] rounded-bl-none"
        }
      `}
    >
      {msg.text}
    </div>
  </div>
            ))}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 flex items-center gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}

              placeholder="Type your message..."
             className="w-full resize-none rounded-xl bg-[#E6E1F2] p-4 text-sm text-[#1B1530] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#3F2870]"
            />
           <button onClick={sendMessage} className="h-10 px-6 bg-[#3F2870] text-white rounded-xl flex items-center gap-2"> <IoSend size={16} /> Send </button>
          </div>
        </div>

      </div>
    </main>
  )
}
