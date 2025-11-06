'use server';

import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";

export async function createOrUpdateStudySession() {
    const profileId = await getSessionUserID();

    const exist = await prisma.dailyStudySession.findFirst({
        where: {
            profileId: profileId,
            createdAt: new Date(),
        },
        select: {
            id: true
        }
    })

    if (!exist) {
        await prisma.dailyStudySession.create({
            data: {
                profileId: profileId
            }
        })
    }
}