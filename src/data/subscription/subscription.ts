import { prisma } from "@/lib/prisma"

export async function getSubscription(profileId: string) {

    try {
        const subscription = await prisma.subscription.findFirst({
            where: {
                profileId: profileId,
                endDate: {gte: new Date()},
            },
        })

        return subscription;
    } catch (error) {
        console.log(error)
        return null;
    }
}