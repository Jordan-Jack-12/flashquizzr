import { getSessionUserID } from "@/actions/auth/session/getUserBySessionId";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const session_id = (await cookies()).get("session_id")?.value
    const userId = await getSessionUserID(session_id!)
    if (!userId) return NextResponse.json({ message: "no user found" }, { status: 404 });

    const { deckId, excludeIds } = await request.json();

    try {
        const cards = await prisma.flashcard.findMany({
            where: {
                deckId,
                id: { notIn: excludeIds },
                dueDate: {lte: new Date()}
            },
            take: 10
        })
        if (!cards) return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 })
        return NextResponse.json({ cards }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}