"use server"

import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";


type ReturnType = {
    data?: {
        deckId: string,
    },
    message?: string,
    success: boolean,
}

export async function saveDeckAndFlashcards({ name, desc, cards }: {name: string, desc: string, cards: Omit<cardType, 'id' | 'deckId'>[]}): Promise<ReturnType> {

    const profileId = await getSessionUserID();

    if (!profileId) return {message: "Unauthorized access", success: false}

    if (!name || !cards || cards.length < 1) {
        return {
            message: "Required deck name",
            success: false,
        }
    }

    
        const deck = await prisma.deck.create({
            data: {
                profileId: profileId,
                name: name,
                description: desc,
            },
            select: {
                id: true
            }
        })

        for (const card of cards) {
            await prisma.flashcard.create({
                data: {
                    profileId,
                    deckId: deck.id,
                    type: card.type,
                    front: card.front,
                    back: card.back,
                    frontImages: card.frontImages,
                    backImages: card.backImages,
                    dueDate: new Date(),
                    options: card.options,
                }
            })
        }

    revalidatePath(`/deck/${deck.id}`, 'layout')
    return {success: true, data: {deckId: deck.id}}
}