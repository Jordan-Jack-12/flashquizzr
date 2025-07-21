import StudyPageDecksCard from '@/components/StudyPageDecksCard'
import { prisma } from '@/lib/prisma'
import React from 'react'

const Studypage = async () => {

    const fakeLoggedInEmail = 'alice@example.com'

    const decks =  await prisma.user.findUnique({
        where: { email: fakeLoggedInEmail },
        include: {
            decks: true
        },
    });

    if (!decks) {
        return (
            <div className='max-h-screen flex flex-col overflow-y-auto justify-evenly ml-4'>
                No Decks Found
            </div>
        )
    }

    return (
        <div className='max-h-screen flex flex-col overflow-y-auto justify-evenly ml-4'>
            <div className='mb-4'>
                <h2 className='text-lg font-semibold'>Due Decks</h2>
                <div className='grid grid-cols-4 gap-3'>
                    {decks.decks.map((item) => {
                        return (
                            <StudyPageDecksCard key={item.id} img_url='url' title={item.title} deck_id={item.id} />
                        )
                    })}
                    
                </div>
            </div>
            <div>
                <h2 className='text-lg font-semibold'>Recently Reviewed</h2>
                <div className='grid grid-cols-4 gap-3'>
                    {decks.decks.map((item) => {
                        return (
                            <StudyPageDecksCard key={item.id} img_url='url' title={item.title} deck_id={item.id} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Studypage