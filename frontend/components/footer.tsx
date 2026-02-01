import Image from "next/image";

export default function Footer() {
  return (
    <section className="bg-[#F2EFF9] border-t border-gray-200 shadow-sm mt-36">
      <div className="container mx-auto px-6 py-14 flex flex-col items-center text-center space-y-4">

        {/* Logo */}
        <Image
          src="/assets/navLogo.svg"
          alt="Logo"
          width={200}
          height={200}
          className="w-40 h-auto mb-2"
        />

        {/* Heading */}
        <h1 className="text-xl md:text-2xl font-semibold text-[#3F2870]">
          Empowering Prenatal Care Through Technology
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-sm md:text-base text-gray-600">
          Providing accessible, organized, and patient-centered prenatal care by connecting mothers with trusted health professionals — anytime, anywhere.
        </p>

        {/* Footer bottom */}
        <div className="pt-4 space-y-1">
          <p className="text-sm text-gray-500">
            © 2026 Prenatal Care App. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built with care for mothers, babies, and healthcare providers.
          </p>
        </div>
      </div>
    </section>
  );
}
