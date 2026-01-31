'use client'

import { useState, useEffect } from "react"
import Headers from "@/components/headers"
import CheckCards from "@/components/checkCards"

type TriageResult = {
  status: "SAFE" | "MONITOR" | "EMERGENCY" | "WAITING"
  message: string
  advice: string
}

type ConfirmedTriage = {
  doctorConfirmed: boolean
  aiResult: TriageResult
}

export default function Check() {
  const [symptoms, setSymptoms] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [confirmed, setConfirmed] = useState<ConfirmedTriage | null>(null)
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  /* ---------------- Submit Symptoms ---------------- */
  const handleCheck = async () => {
    if (!symptoms.trim()) return

    try {
      setLoading(true)
      setConfirmed(null)
      setSubmitted(true)
      setStatusMessage("Analyzing your symptoms…")

      const res = await fetch("http://localhost:8080/api/triage/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      })

      const data = await res.json()

      // After submitting, start polling for doctor confirmation
      setStatusMessage("Waiting for doctor confirmation…")
    } catch (err) {
      console.error(err)
      setStatusMessage("Something went wrong. Please try again.")
      setSubmitted(false)
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- Poll Doctor Confirmation ---------------- */
  useEffect(() => {
    if (!submitted) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:8080/api/Ai/confirmed")
        const data = await res.json()

        if (data.doctorConfirmed) {
          setConfirmed(data)
          setStatusMessage("Doctor confirmed your assessment.")
          clearInterval(interval)
        }
      } catch (err) {
        console.error(err)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [submitted])

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">

        <Headers
          title="Check Symptoms"
          subtitle="Describe how you're feeling"
          icon="heart"
        />

        {/* Input */}
        <section className="rounded-2xl bg-[#F2EFF9] p-7 shadow-md">
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            How are you?
          </h1>

          <textarea
            rows={4}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="I'm feeling..."
            className="w-full resize-none rounded-xl bg-[#E6E1F2] p-4 text-sm text-[#1B1530] outline-none"
          />

          <button
            onClick={handleCheck}
            disabled={loading || submitted}
            className="w-full mt-4 rounded-xl bg-[#3F2870] py-3 text-white font-bold disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Analyzing..." : submitted ? "Submitted" : "Analyze"}
          </button>
        </section>

        {/* AI Section */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            AI Assessment
          </h1>

          {statusMessage && (
            <p className="text-center text-sm opacity-70">{statusMessage}</p>
          )}

          {/* Waiting Card */}
          {submitted && !confirmed && (
            <div className="mt-6 rounded-2xl bg-yellow-50 border border-yellow-300 p-6 text-center">
              <h2 className="text-lg font-semibold text-[#3F2870]">
                Waiting for Doctor Confirmation
              </h2>
              <p className="mt-2 text-sm  text-[#3F2870]">
                Your symptoms are being reviewed by a healthcare professional.
              </p>
            </div>
          )}

          {/* Confirmed Card */}
          {confirmed?.doctorConfirmed && (
            <div className="mt-6 rounded-2xl bg-green-50 border border-green-400 p-6">
              <h2 className="text-lg font-bold text-[#3F2870] mb-2">
                Doctor Confirmed Diagnosis
              </h2>

              <p className="font-semibold text-[#3F2870]">
                Status: {confirmed.aiResult.status}
              </p>

              <p className="mt-2 text-[#3F2870]">{confirmed.aiResult.message}</p>

              <p className="mt-2 text-sm opacity-70 text-[#3F2870]">{confirmed.aiResult.advice}</p>
            </div>
          )}
        </section>

      </div>
    </main>
  )
}
