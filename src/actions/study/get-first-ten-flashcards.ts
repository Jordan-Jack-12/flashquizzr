"use server";

import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";

type ReturnType = {
    data?: {
        id: string;
        type: 'BASIC' | 'MCQ'| 'CLOZE'| 'LIST'| 'IMAGE_OCCLUSION';
        front: string;
        back: string;
        frontImages: string[];
        backImages: string[];
        options: string[];
        new: boolean;
        easeFactor: number;
        interval: number;
        repetitions: number;
        dueDate: Date;
        lastReviewed: Date | null;
        lapses: number;
    }[];
    success: boolean;
    msg?: string;
};

export async function getFirstTenFlashcards(
    formdata: FormData
): Promise<ReturnType> {
    const userId = await getSessionUserID();
    const deckId = formdata.get("deck-id") as string;

    try {
        const cards = await prisma.flashcard.findMany({
            where: {
                profileId: userId,
                deckId: deckId,
                dueDate: { lte: new Date() },
                // id: { notIn: excludedIdsArray }
            },
            select: {
                id: true,
                type: true,
                front: true,
                frontImages: true,
                back: true,
                backImages: true,
                options: true,
                new: true,
                easeFactor: true,
                interval: true,
                repetitions: true,
                dueDate: true,
                lastReviewed: true,
                lapses: true
            },
            take: 10,
        });

        if (!cards) return { success: false, msg: "Couldn't fetch cards.." };

        return {
            success: true,
            msg: "Fetched Cards",
            data: cards,
        };
    } catch (error) {
        console.log(error);
        return { success: false, msg: "Something went wrong!" };
    }
}
