import { prisma } from "@/lib/prisma";

export async function getDecksCount(profileId: string) {
    try {
        const count = await prisma.deck.count({
            where: {
                profileId: profileId,
            }
        })
        return count
    } catch (error) {
        console.log(error)
        return null;
    }
}