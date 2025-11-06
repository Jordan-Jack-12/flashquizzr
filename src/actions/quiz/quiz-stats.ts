import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";

export async function getTotalQuizSessions() {
    const profileId = await getSessionUserID();

    if (!profileId) return {
        success: false,
        message: 'Unauthorized access'
    }

    const quizzes = await prisma.quizSession.findMany({
        where: {
            profileId: profileId,
        },
        omit: {
            id: true,
            profileId: true,
            deckId: true,
            createdAt: true,
        }
    })
    if (!quizzes) {
        return {
            success: false,
            message: 'Something went wrong!',
        }
    }

    let avgScore: number = 0;
    let totalScore: number = 0;
    let total: number = 0;
    let highestScore: number = 0;

    for (const q of quizzes) {
        totalScore += q.score;
        total += q.total;
        if (highestScore < q.score) {
            highestScore = q.score;
        }
    }

    avgScore = ( totalScore/total ) || 0;

    return {
        success: true,
        message: 'Successful',
        data: {
            total: quizzes.length,
            average: avgScore,
            highest: highestScore,
        },
    }
}

export async function getRecentQuizzSessions() {
    const profileId = await getSessionUserID();

    if (!profileId) {
        return {
            success: false,
            message: 'Unauthorized Access',
        }
    }

    const quizzes = await prisma.quizSession.findMany({
        where: {
            profileId: profileId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 4
    })

    if (!quizzes) {
        return {
            success: false,
            message: 'Something went wrong!'
        }
    }

    return {
        success: true,
        message: 'Successfull',
        data: quizzes,
    }
}
