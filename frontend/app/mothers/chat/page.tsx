    'use client'

    import Link from "next/link"
    import { FaUserMd } from "react-icons/fa"

    const doctors = [
    {
        id: "d1",
        name: "Dr. Adrian James F. Bona",
        hospital: "Barangay Calauag Health Center",
    },
    {
        id: "d2",
        name: "Dr. Maria Elena Cruz",
        hospital: "Barangay Calauag Health Center",
    },
    {
        id: "d3",
        name: "Dr. Jonathan Reyes",
        hospital: "Naga City Health Office",
    },
    {
        id: "d4",
        name: "Dr. Liza Santos",
        hospital: "Naga City Health Office",
    },
    ]

    export default function ChatInbox() {
    return (
        <main className="min-h-screen  px-6 pt-20 ">
        <div className="mx-auto max-w-3xl">

            <h1 className="text-2xl font-semibold text-[#3F2870]">
            Messages
            </h1>

            <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {doctors.map(doc => (
                <Link
                key={doc.id}
                href={`/mothers/chat/${doc.id}`}
                className="flex items-center gap-4 rounded-2xl bg-[#F2EFF9] p-6 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all"
                >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center text-[#3F2870]">
                    <FaUserMd size={24} />
                </div>

                {/* Text */}
                <div className="flex-1">
                    <h2 className="font-semibold text-[#3F2870]">
                    {doc.name}
                    </h2>
                    <p className="text-sm text-[#3F2870] opacity-80 truncate">
                    {doc.hospital}
                    </p>
                </div>

                {/* Status */}
                <span className="text-xs text-green-600 font-semibold">
                    Online
                </span>
                </Link>
            ))}

            </section>

        </div>
        </main>
    )
    }
