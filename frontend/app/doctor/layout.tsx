// app/doctor/layout.tsx
import DoctorsNavigation from "@/components/doctosNavigation";
export const metadata = {
  title: "Doctor Dashboard",
};

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F2EFF9]">
      <DoctorsNavigation /> {/* Persistent navbar for doctor pages */}
      <main className="pt-20 px-6">{children}</main>
    </div>
  );
}
