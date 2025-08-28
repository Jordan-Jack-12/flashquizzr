import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ deck_id: string }> }) {
    const userId = await getSessionUserID();
    const { deck_id } = await params

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await prisma.$transaction(async (tx) => {
            await tx.deck.delete({
                where: { id: deck_id, profileId: userId }
            })
        })

        return NextResponse.json({message: "Successfully deleted"},{status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error},{status: 500})
    }
}