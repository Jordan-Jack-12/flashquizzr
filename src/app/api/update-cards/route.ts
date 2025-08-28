import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type editedItemType = Omit<cardType, 'id' | 'type' | 'deckId' | 'options'>
type newCardType = Omit<cardType, 'deckId' | 'options'>

export async function POST(request: NextRequest) {
    const { deck_id, deckInfo, deletedIds, newCards, editedCards } = await request.json();
    if (!deck_id) return NextResponse.json({ error: "Deck Id is required" }, { status: 400 });
    if (!deckInfo && deletedIds.length < 1 && newCards.length < 1 && Object.keys(editedCards).length < 1) return NextResponse.json({ error: "Updated Data is required" }, { status: 400 });

    const userId = await getSessionUserID()

    if (!userId) return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 })

    const editedCardsTyped: Record<string, editedItemType> = editedCards

    try {
        await prisma.$transaction(async (tx) => {
            await tx.deck.update({
                where: { id: deck_id },
                data: {
                    name: deckInfo.title,
                    description: deckInfo.desc,
                }
            })

            await Promise.all(
                Object.entries(editedCardsTyped).map(([id, item]) => {
                    return tx.flashcard.update({
                        where: { id: id },
                        data: { ...item }
                    })
                })
            )

            await Promise.all(
                newCards.map(async (item: newCardType) => {
                    return tx.flashcard.create({
                        data: {
                            profileId: userId,
                            deckId: deck_id,
                            type: item.type,
                            front: item.front,
                            back: item.back,
                            frontImages: item.frontImages,
                            backImages: item.backImages,
                            dueDate: new Date()
                        }
                    })
                })
            )

            await tx.flashcard.deleteMany({
                where: { id: { in: deletedIds } }
            })
        })

        const deck = await prisma.deck.findUnique({
            where: { id: deck_id },
            include: {
                flashcards: {
                    select: {
                        id: true,
                        type: true,
                        front: true,
                        back: true,
                        frontImages: true,
                        backImages: true,
                    }
                }
            }
        })

        revalidatePath(`/deck/${deck_id}`)
        return NextResponse.json({ deck }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })
    }

}