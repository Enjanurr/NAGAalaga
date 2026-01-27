import Headers from "@/components/headers"
import CheckCards from "@/components/checkCards"

export default function Check() {
  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
      <div className="mx-auto max-w-3xl space-y-10">

        <Headers
          title="Check Symptoms"
          subtitle="Describe how you're feeling"
          icon="heart"
        />

        {/* Symptom Input */}
        <section className="rounded-2xl bg-[#F2EFF9] p-7 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            How are you?
          </h1>

          <textarea
            rows={4}
            placeholder="I'm feeling..."
            className="w-full resize-none rounded-xl bg-[#E6E1F2] p-4 text-sm text-[#1B1530] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#3F2870]"
          />

          <div className="flex items-center justify-between text-xs opacity-70 text-black py-4">
            <p>Describe your symptoms in detail</p>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#3F2870] py-3 font-bold text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:opacity-95 transition-all cursor-pointer"
          >
            Analyze
          </button>
        </section>

        {/* AI Assessment */}
        <section>
          <h1 className="text-2xl font-semibold text-[#3F2870] mb-4">
            AI Assessment
          </h1>

          <CheckCards />
        </section>

      </div>
    </main>
  )
}
