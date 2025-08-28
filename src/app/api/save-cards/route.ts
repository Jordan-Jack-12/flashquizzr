import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type CardType = {
    deckId: string,
    type: 'BASIC' | 'MCQ' | 'CLOZE' | 'LIST' | 'IMAGE_OCCLUSION',
    front: string,
    back: string,
    front_images: string[],
    back_images: string[],
    options?: string[],
}

export async function POST(request: Request) {
    const userId = await getSessionUserID()
    const { name, desc, cards } = await request.json();
    if (!userId || !name || !desc || !cards || name.length < 1 || cards.length < 1) return NextResponse.json({ text: "PayLoad Is Required" }, { status: 400 });

    const cardsArray: CardType[] = cards;
    let deckId: string = "";

    try {
        await prisma.$transaction(async (tx) => {
            const deck = await tx.deck.create({
                data: {
                    profileId: userId,
                    name: name,
                    description: desc
                }
            })

            deckId = deck.id;

            for (const card of cardsArray) {
                await tx.flashcard.create({
                    data: {
                        profileId: userId,
                        deckId: deck.id,
                        type: card.type,
                        front: card.front,
                        frontImages: card.front_images,
                        back: card.back,
                        backImages: card.back_images,
                        options: card.options,
                        dueDate: new Date(),
                    }
                })
            }
        })
        
        console.log(deckId)
        return NextResponse.json({ deckId, text: "Succesfully saved Deck and Cards" }, { status: 200 })
    } catch (error) {
        console.log(error, "dsjdo");
        return NextResponse.json({ text: "Something wrong happened" }, { status: 500 })
    }

}