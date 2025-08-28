import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ deck_id: string }> }) {
    const deckId = (await params).deck_id;
    try {
        const now = new Date();

        const dueCount = await prisma.flashcard.count({
            where: {
                deckId,
                dueDate: { lte: now },
            },
        })

        return NextResponse.json({ dueCards: dueCount }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}