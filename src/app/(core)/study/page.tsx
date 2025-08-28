import StudyPageDecksCard from '@/components/StudyPageDecksCard'
import { getSessionUserID } from '@/data/user/get-session-user-id'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

const Studypage = async () => {
    const userId = await getSessionUserID()

    if (!userId || userId.length < 1) redirect('/login');

    const due_decks = await prisma.deck.findMany({
        where: {
            profileId: userId,
            flashcards: {
                some: {
                    dueDate: { lte: new Date() }
                }
            }
        },
        include: {
            _count: {
                select: {
                    flashcards: {
                        where: {
                            dueDate: { lte: new Date() }
                        }
                    }
                }
            }
        },
        take: 4
    })

    const recent_reviewed_decks = await prisma.deck.findMany({
        where: {
            profileId: userId,
            flashcards: {
                some: {
                    dueDate: { gte: new Date() }
                }
            }
        },
        include: {
            _count: {
                select: {
                    flashcards: {
                        where: {
                            dueDate: { lte: new Date() }
                        }
                    }
                }
            }
        },
        take: 4
    })


    return (
        <div className='flex flex-col justify-evenly'>
            <div className='flex gap-1 items-center py-2 text-stone-400 font-bold'><span>Study</span></div>
            <div className='mb-4'>
                <h2 className='text-lg font-semibold'>Due Decks</h2>
                <div className='grid grid-cols-4 gap-3'>
                    {due_decks.map((deck, index) => {
                        return (
                            <StudyPageDecksCard key={index} title={deck.name} desc={deck.description} deck_id={deck.id} count={deck._count.flashcards} />
                        )
                    })}
                </div>
            </div>
            <div>
                <h2 className='text-lg font-semibold'>Recently Reviewed</h2>
                <div className='grid grid-cols-4 gap-3'>
                    {recent_reviewed_decks.length > 0 ? recent_reviewed_decks.map((deck, index) => {
                        return (
                            <StudyPageDecksCard key={index} title={deck.name} desc={deck.description} deck_id={deck.id} count={deck._count.flashcards} />
                        )
                    }) : <p>No Decks Found</p>}
                </div>
            </div>
        </div>
    )
}

export default Studypage