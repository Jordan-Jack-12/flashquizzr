import { prisma } from "@/lib/prisma";
import { getSessionUserID } from "../user/get-session-user-id";

export async function createDeckAndReturnId({ name, desc }: {
    name: string,
    desc: string
}) {
    const userId = await getSessionUserID();
    const deck = await prisma.deck.create({
        data: {
            profileId: userId,
            name,
            description: desc
        }
    })

    if (!deck) return null

    return deck.id
}