import { getSessionUserID } from "@/actions/auth/session/getUserBySessionId";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session_id = (await cookies()).get("session_id")?.value
    const userId = await getSessionUserID(session_id!)
    const { title, description } = await request.json()
    console.log("sesion id ",session_id);
    console.log(" user id ", userId)
    if (!title || title.length === 0 || !userId) return NextResponse.json({ text: "Prompt is Required!" }, { status: 200 });
    try {
        const deck = await prisma.deck.create({
        data: {
            name: title,
            description: description,
            profileId: userId 
        }
        
    })
    console.log(deck)
    return NextResponse.json({deckId: deck.id}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({})
    }

}