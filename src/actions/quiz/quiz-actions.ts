'use server';

import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";

export async function getQuizQuestions(formdata: FormData) {
    const deckId = formdata.get('deck-id') as string;
    const profileId = await getSessionUserID();

    if (!deckId || !profileId) {
        return {
            success: false,
            message: 'Unauthorized access',
        }
    }

    const quizzes = await prisma.flashcard.findMany({
        where: {
            profileId: profileId,
            deckId: deckId,
            type: 'MCQ',
        },
        select: {
            id: true,
            front: true,
            back: true,
            frontImages: true,
            backImages: true,
            options: true,
        },
    })

    if (!quizzes) {
        return {
            success: false,
            message: 'Not found',
        }
    }

    return {
        success: true,
        message: 'Successful',
        data: quizzes,
    }
}

export async function getAllQuizzes() {
    const profileId = await getSessionUserID();

    if (!profileId) {
        return {
            success: true,
            message: 'Unauthorized access',
        }
    }

    const quizzes = await prisma.deck.findMany({
        where: {
            profileId,
        },
        select: {
            id: true,
            name: true,
            description: true,
        }
    })

    if (!quizzes) {
        return {
            success: false,
            message: 'Not Found!',
        }
    }

    return {
        success: true,
        message: 'Successful',
        data: quizzes,
    }
}