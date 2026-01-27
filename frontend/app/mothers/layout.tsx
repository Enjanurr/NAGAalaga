// app/mothers/layout.tsx
import MothersNavigation from "@/components/mothersNavigation";
export const metadata = {
  title: "Mothers Dashboard",
};

export default function MothersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F2EFF9]">
      <MothersNavigation /> {/* Persistent navbar for mothers pages */}
      <main className="pt-20 px-6">{children}</main>
    </div>
  );
}
