import DeckPane from "@/components/deckPage/deckPane";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type PageParams = {
    params: Promise<{
        deck_id: string;
    }>
}

// export const dynamic = "force-dynamic";

const DeckPage = async (props: PageParams) => {

    const deck = await prisma.deck.findUnique({
        where: { id: (await props.params).deck_id },
        include: {
            flashcards: {
                select: {
                    id: true,
                    type: true,
                    front: true,
                    frontImages: true,
                    back: true,
                    backImages: true,
                }
            }
        }
    })

    if (!deck) redirect('/dashboard')

    const flashcards = deck.flashcards
    return (
        <main>
            <DeckPane id={deck.id} name={deck.name} desc={deck.description} flashcards={flashcards} />
        </main>
    )
}

export default DeckPage