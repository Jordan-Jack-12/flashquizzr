import { prisma } from '@/lib/prisma'

type PageParams = {
    params: Promise<{
        deck_id: string;
    }>
}

const DeckPage = async (props : PageParams) => {

    const email = "alice@example.com"
    const { deck_id } = await props.params

    const user = await prisma.user.findUnique({
        where: { email: email },
        include: {
            decks: {
                where: { id: deck_id},
                include: {
                    flashcards: true
                }
            }
        }
    })

    if (!user) {
        return <div>No Deck Found</div>
    }


    return (
        <div className='max-h-screen flex flex-col gap-4 justify-items-start'>
            <div className='text-xl'>Deck Name: {user.decks[0].title}</div>
            <div>Number of Cards: {user.decks[0].flashcards.length}</div>
            {user.decks[0].flashcards.map((item) => {
                return (
                    <div key={item.id}>
                        <h2>{item.question}</h2>
                        <h3>{item.answer}</h3>
                    </div>
                )
            })}
            <form action="">
                <input type="hidden" name='action_type' value={"add"} />
                <input type="hidden" name='deck_id' value={user.decks[0].id} />
                <input type="hidden" name='flashcard_id' value={""} />
                <button className='button_gradient rounded-lg w-full py-2 text-center hover:button_gradient_rev'>Add New</button>
            </form>
        </div>
    )
}

export default DeckPage