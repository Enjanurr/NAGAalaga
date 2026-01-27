import DashboardHeader from "@/components/dashboardHeader"
import { BiCalendar, BiHeart  } from "react-icons/bi"
import { LuHeartPulse } from "react-icons/lu";
import { IoWomanOutline } from "react-icons/io5";
import DashboardDivs from "@/components/dashBoardDivs"

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#F2EFF9] px-6 pt-20">
     <div className="mx-30">
         <DashboardHeader />

      {/* Quick Actions */}
      <h1 className="mt-10 text-2xl font-semibold text-[#3F2870]">
        Quick Actions
      </h1>

   <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

  <div className="flex items-center gap-4 rounded-2xl bg-[#F2EFF9] p-6 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">
    <div className="flex h-12 w-12 items-center justify-center text-[#3F2870]">
      <LuHeartPulse size={24} />
    </div>

    <div>
      <h2 className="font-semibold text-[#3F2870]">Set Appointment</h2>
      <p className="text-sm text-[#3F2870] opacity-80">
        Dr. Adrian James F. Bona
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 rounded-2xl bg-[#F2EFF9] p-6 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">
    <div className="flex h-12 w-12 items-center justify-center text-[#3F2870]">
      <BiCalendar size={24} />
    </div>

    <div>
      <h2 className="font-semibold text-[#3F2870]">Next Checkup</h2>
      <p className="text-sm text-[#3F2870] opacity-80">
        January 20, 2026
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 rounded-2xl bg-[#F2EFF9] p-6 shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all">
    <div className="flex h-12 w-12 items-center justify-center text-[#3F2870]">
      <BiHeart size={24} />
    </div>

    <div>
      <h2 className="font-semibold text-[#3F2870]">Health Log</h2>
      <p className="text-sm text-[#3F2870] opacity-80">
        Normal
      </p>
    </div>
  </div>

</section>


       <h1 className="mt-10 text-2xl font-semibold text-[#3F2870]">
        Barangay Notifications
      </h1>

     <div className="">
         <DashboardDivs />
          
     </div>
     </div>
    </main>
  )
}
