import { redirect } from "next/navigation";
import { getSessionUserID } from "../user/get-session-user-id";
import { prisma } from "@/lib/prisma";

export async function getDecks({ full }: { full: boolean }) {
    const userId = await getSessionUserID();

    if (!userId) redirect('/login');

    if (full) {
        const decks = await prisma.deck.findMany({
            where: { profileId: userId },
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (!decks) redirect('/login');
        return decks
    } else {
        const decks = await prisma.deck.findMany({
            where: { profileId: userId },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id:true,
                name:true,
            }
        })

        if (!decks) redirect('/login');
        return decks
    }
}