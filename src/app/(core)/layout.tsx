import AdSpace from "@/components/AdSpace";
import SideBar from "@/components/ui/sideBar/SideBar";
import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const paid = false;
    const userId = await getSessionUserID()
    const verified = await prisma.profile.findUnique({
        where: {
            id: userId
        }
    })
    return (
        <div className="md:flex gap-2 min-h-screen">
            <SideBar />
            <div className="w-full">
                {!verified?.emailVerifiedAt &&
                    <div className="bg-orange-950 text-orange-400">
                        verify your email
                    </div>
                }

                {children}
            </div>
            {!paid && <AdSpace />}
        </div>
    )
}