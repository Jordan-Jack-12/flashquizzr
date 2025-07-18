import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.createMany({
        data: [
            { email: 'alice@example.com', passwordHash: 'hashedpass1' },
            { email: 'bob@example.com', passwordHash: 'hashedpass2' },
            { email: 'carol@example.com', passwordHash: 'hashedpass3' },
        ],
    })

    const [alice, bob, carol] = await prisma.user.findMany()

    // Helper function to make decks with flashcards
    async function createDeckWithCards(userId: string, title: string) {
        const deck = await prisma.deck.create({
            data: {
                userId,
                title,
                description: `Deck: ${title}`,
                isPublic: false,
            },
        })

        await prisma.flashcard.createMany({
            data: [
                { deckId: deck.id, question: 'What is AI?', answer: 'Artificial Intelligence' },
                { deckId: deck.id, question: 'What is JS?', answer: 'JavaScript' },
                { deckId: deck.id, question: 'What is HTTP?', answer: 'HyperText Transfer Protocol' },
                { deckId: deck.id, question: 'What is DNS?', answer: 'Domain Name System' },
                { deckId: deck.id, question: 'What is RAM?', answer: 'Random Access Memory' },
            ],
        })
    }

    // Alice: 2 decks
    await createDeckWithCards(alice.id, 'Tech Basics')
    await createDeckWithCards(alice.id, 'Frontend Quick Review')

    // Bob: 1 deck
    await createDeckWithCards(bob.id, 'Science Essentials')

    // Carol: 1 deck
    await createDeckWithCards(carol.id, 'World History')

    // Add a subscription for Alice
    await prisma.subscription.create({
        data: {
            userId: alice.id,
            plan: 'pro',
            startDate: new Date(),
            status: 'active',
        },
    })

    // Optional: Add one study session for Bob
    const deck = await prisma.deck.findFirst({ where: { userId: bob.id } })

    if (deck) {
        await prisma.studySession.create({
            data: {
                userId: bob.id,
                deckId: deck.id,
                mode: 'study',
                startedAt: new Date(),
                score: 80,
            },
        })
    }

    console.log('✅ Seed complete')
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
