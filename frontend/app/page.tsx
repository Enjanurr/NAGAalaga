import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#F2EFF9] grid grid-cols-2 h-screen">

        {/* Left Content */}
        <div className="flex flex-col justify-center px-16 space-y-6">

          <h1 className="text-[#3F2870] text-6xl font-bold leading-tight">
            Welcome to NAGAalaga: <br />
            Your Partner in Maternal Health
          </h1>

          <h3 className="text-2xl font-medium text-gray-700">
            Empowering Mothers, Connecting Barangays, Saving Lives
          </h3>

          <Link href="/mothers/dashboard">
            <button className="w-fit mt-4 bg-[#5A6CFF] text-white px-8 py-3 rounded-xl hover:opacity-90 transition cursor-pointer">
              Get Started
            </button>
          </Link>

        </div>

        {/* Right Image */}
        <div className="relative h-screen w-full">
          <Image
            src="/assets/mother.svg"
            alt="Mother"
            fill
            className="object-cover"
            priority
          />
        </div>

      </section>
    </main>
  );
}
