import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import DataTable from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";



const AdminPage = async () => {
    const appointments = await getRecentAppointmentList();
  
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-[#0D0F10] px-[5%] py-5 shadow-lg xl:px-12">
            <Link href="/" className="cursor-pointer">
                <Image
                    src="/assets/icons/logo-full.svg"
                    height={32}
                    width={162}
                    alt="logo"
                    className="h-8 w-fit"
                />
                <p className="text-[16px] leading-[20px] font-semibold">Admin Dashboard</p>
            </Link>
        </header>
        <main className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12">
            <section className="w-full space-y-4">
                <h1 className="text-[32px] leading-[36px] font-bold md:text-[36px] md:leading-[40px] font-bold">Welcome 👋</h1>
                <p className="text-[#ABB8C4]">
                    Start the day with managing new appointments
                </p>
            </section>
            <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
                <StatCard
                    type="appointments"
                    count={appointments.scheduledCount}
                    label="Scheduled appointments"
                    icon={"/assets/icons/appointments.svg"}
                />
                <StatCard
                    type="pending"
                    count={appointments.pendingCount}
                    label="Pending appointments"
                    icon={"/assets/icons/pending.svg"}
                />
                <StatCard
                    type="cancelled"
                    count={appointments.cancelledCount}
                    label="Cancelled appointments"
                    icon={"/assets/icons/cancelled.svg"}
                />
            </section>
            <DataTable 
                columns={columns} 
                data={appointments.documents} 
            />
        </main> 
    </div>
  )
}

export default AdminPage