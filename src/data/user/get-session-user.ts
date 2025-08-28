import { getSessionUserID } from "./get-session-user-id";
import { prisma } from "@/lib/prisma";

export default async function getSessionUser() {
    'use server'
    const userId = await getSessionUserID()

    const user = await prisma.profile.findUnique({
        where: {id: userId},
        select: {
            email: true,
            firstName: true,
            lastName: true,
        }
    })

    if (!user) return null;

    return user;
}