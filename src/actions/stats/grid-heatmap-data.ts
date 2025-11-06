'use server';

import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";

export async function getStudySessionsWithDate() {
    const profileId = await getSessionUserID();

    const data = await prisma.dailyStudySession.findMany({
        where: {
            profileId: profileId,
            AND: [
                {createdAt: {lte: new Date()}},
                {createdAt: {gte: new Date(2025, 0, 1)}}
            ]
        }
    })

    if (!data) {
        return {
            success: false,
            message: 'Something went wrong',
        }
    }

    const processedData: { [key: string]: { count: number } }  = {};

    data.forEach(item => {
        processedData[new Date(item.createdAt).toISOString().split('T')[0]] = {
            count: item.cardsReviewed
        }
    })
    
    return {
        success: true,
        message: 'Successful',
        data: processedData
    }
}