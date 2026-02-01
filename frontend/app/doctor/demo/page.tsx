'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

type Triage = {
  _id: string
  symptomsOriginal: string
  symptomsEnglish: string
  languageDetected: string
  aiResult?: {
    status: "SAFE" | "MONITOR" | "EMERGENCY"
    message: string
    advice: string
  }
  doctorConfirmed: boolean
  createdAt: string
}

export default function Demo() {
  const [triage, setTriage] = useState<Triage | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState(false)

  // Fetch latest triage from backend
  useEffect(() => {
    const fetchTriage = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/Ai/translate")
        const data = await res.json()
        setTriage(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTriage()
  }, [])

  // Handle doctor confirmation
  const handleConfirm = async () => {
    if (!triage?._id) return

    try {
      setConfirming(true)

      const res = await fetch("http://localhost:8080/api/Ai/confirmDoctor", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triageId: triage._id }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      // Immediately update UI with returned triage data
      setTriage(data.triage)

    } catch (err) {
      console.error(err)
      alert("Failed to confirm")
    } finally {
      setConfirming(false)
    }
  }

  if (loading) return <p className="p-6">Loading latest triage...</p>

  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-8">

        <Link href="/doctor/patients" className="text-[#3F2870] font-semibold">
          ← Back
        </Link>

        <h1 className="text-2xl font-bold text-[#3F2870]">
          Maria Clara De Los Santos
        </h1>

        {!triage && <p>No triage data found.</p>}

   
        {triage && (
          <div className="rounded-2xl bg-[#F2EFF9] p-6 shadow-md space-y-3 text-[#3F2870]">

            <p>
              <strong>Original Symptoms:</strong><br />
              {triage.symptomsOriginal}
            </p>

            <p>
              <strong>Translated:</strong><br />
              {triage.symptomsEnglish}
            </p>

            <p>
              <strong>Detected Language:</strong> {triage.languageDetected}
            </p>

            <hr />

            <p className="font-bold">
              Status: {triage.aiResult?.status ?? "N/A"}
            </p>

            <p>{triage.aiResult?.message}</p>

            <p className="text-sm opacity-70">
              {triage.aiResult?.advice}
            </p>

            <p className="text-xs opacity-50">
              Doctor confirmed: {triage.doctorConfirmed ? "Yes" : "No"}
            </p>

          </div>
        )}

        {/* Waiting card while PATCH is in progress */}
        {confirming && (
          <div className="rounded-2xl bg-yellow-100 p-6 shadow-md text-center text-[#3F2870] mt-4">
            Confirming assessment… ⏳
          </div>
        )}

        {/* Confirm Button */}
   {triage && !triage.doctorConfirmed && (
  <div className="mt-6 flex gap-3">
    {/* Edit */}
    <button
      className="w-full rounded-xl border border-[#3F2870] py-2.5 text-[#3F2870] font-semibold hover:bg-[#3F2870]/5 transition cursor-pointer"
    >
      Edit response
    </button>

    {/* Reject (destructive) */}
    <button
      className="w-full rounded-xl border border-red-500 py-2.5 text-red-500 font-semibold hover:bg-red-50 transition cursor-pointer"
    >
      Reject
    </button>

    {/* Confirm (primary) */}
    <button
      onClick={handleConfirm}
      disabled={confirming}
      className="w-full rounded-xl bg-[#3F2870] py-3 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2f1e55] transition cursor-pointer"
    >
      {confirming ? "Confirming..." : "Confirm Assessment"}
    </button>
  </div>
)}

        {/* Already confirmed */}
        {triage?.doctorConfirmed && (
          <p className="text-center text-[#3F2870] font-semibold mt-4">
            Assessment confirmed ✅
          </p>
        )}

      </div>
    </main>
  )
}
