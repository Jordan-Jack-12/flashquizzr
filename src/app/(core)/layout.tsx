import AdSpace from "@/components/AdSpace";
import SideBar from "@/components/ui/sideBar/SideBar";
import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const userId = await getSessionUserID()
    const user = await prisma.profile.findUnique({
        where: {
            id: userId
        }
    })
    const userSubcription = await prisma.subscription.findFirst({
        where: {
            profileId: userId
        },
        select: {
            id: true
        },
        orderBy: {startDate: 'desc'}
    })
    return (
        <div className="md:flex gap-2 min-h-screen">
            <SideBar />
            <div className="w-full">
                {!user?.emailVerifiedAt &&
                    <div className="bg-orange-950 text-orange-400">
                        verify your email
                    </div>
                }

                {children}
            </div>
            {!userSubcription && <AdSpace />}
        </div>
    )
}