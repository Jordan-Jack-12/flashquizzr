"use server"

import { prisma } from "@/lib/prisma"

export async function getDeckListServerAction() {
    const user = await prisma.user.findUnique({
        where: {email: "alice@example.com"},
        include: {
            decks: {
                select: {
                    title: true,
                    id: true,
                }
            }
        }
    })

    if (!user) {
        return []
    }

    return user.decks
}