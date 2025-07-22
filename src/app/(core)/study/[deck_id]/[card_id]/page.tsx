import StudyPane from '@/components/ui/studyPane/StudyPane'
import { prisma } from '@/lib/prisma'

type PageParams = {
    params: Promise<{
        deck_id: string;
        card_id: string
    }>
}

const CardPage = async (props: PageParams) => {

    const { deck_id, card_id } = await props.params;

    const card = await prisma.flashcard.findUnique({
        where: { id: card_id },
    });

    if (!card) {
        return (
            <div className='min-h-screen flex flex-col gap-2 justify-center items-center'>
                <h2>Card not found</h2>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex flex-col gap-2'>
            <StudyPane deck_id={deck_id} card_id={card_id} question={"fsadfsad"} answer={"fsajdkf"} />
        </div>
    )
}

export default CardPage