'use server';

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updatedCardsSchema = z.object({
    cardId: z.string(),
    deckId: z.string(),
    new: z.boolean(),
    learned: z.boolean(),
    easeFactor: z.number(),
    interval: z.number(),
    repetitions: z.number(),
    dueDate: z.coerce.date(),
    lastReviewed: z.coerce.date(),
    lapses: z.number()
})

export async function updateFlashcardsDueDate(formdata: FormData) {
    const updateCards = formdata.get('updated-cards') as string;
    const updateCardsArray = JSON.parse(updateCards)
    const notUpdatedIds: string[] = [];
    // create a way to get not updated ids, in case something went so that we can send back the not update ids and dont delete that in front end
    try {
        for (const c of updateCardsArray) {
            const {data, error} = updatedCardsSchema.safeParse(c);
            if (error) return {success: false, msg: 'Card couldn\'t update'};
            await prisma.flashcard.update({
                where: {id: data.cardId},
                data: {
                    new: data.new,
                    learned: data.learned,
                    easeFactor: data.easeFactor,
                    interval: data.interval,
                    repetitions: data.repetitions,
                    dueDate: data.dueDate,
                    lastReviewed: data.lastReviewed,
                }
            })
        }
        return {success: true, msg: 'All cards updated'};
    } catch (error) {
        console.log(error);
        return {success: true, msg: "Something went wrong!", notUpdatedIds: notUpdatedIds};
    }
}