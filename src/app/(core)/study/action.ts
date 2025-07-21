"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function chooseRandomCardId(formdata: FormData) {
    const deck_id = formdata.get("deck_id")!.toString();

    if (!deck_id) {
        throw new Error('Missing required data');
    }

    const deck = await prisma.deck.findUnique({
        where: {id: deck_id},
        include: {
            flashcards: {
                select: {
                    id: true
                }
            }
        }
    })
    if(!deck) {
        return
    }

    const random_card_id = deck.flashcards.at(0);

    redirect(`/study/${deck_id}/${random_card_id!.id}`)

}