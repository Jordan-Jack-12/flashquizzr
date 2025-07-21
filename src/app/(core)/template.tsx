import AdSpace from "@/components/AdSpace";
import SideBar from "@/components/ui/SideBar";

export default function Template({ children }: { children: React.ReactNode }) {
    const paid = false;
    return (
        <div className="md:flex gap-2 justify-between min-h-screen">
            <SideBar />
            <div className="min-w-[70%]">
                {children}
            </div>
            {!paid && <AdSpace />}
        </div>
    )
}