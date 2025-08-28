import HomePageDecksCard from '@/components/ui/dashboardPage/HomePageDecksCard'
import { getSessionUserID } from '@/data/user/get-session-user-id';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

const DashboardPage = async () => {

    const userId = await getSessionUserID();

    if (!userId) {
        redirect("/login");
    }

    const profileId = userId;

    const profile = await prisma.profile.findUnique({
        where: { id: profileId },
        select: {
            firstName: true,
        }
    })

    const decks = await prisma.deck.findMany({
        where: {
            profileId: profileId,
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

    if (!profile || !decks) {
        redirect("/login");
    }

    return (
        <div>
            <div className='w-full rounded-lg bg-orange-50 text-black dark:bg-stone-900 dark:text-white'>
                <p className='py-2 text-stone-400 font-bold'>Dashboard</p>
                <h1 className='text-3xl font-bold'>Hello, {profile.firstName}</h1>

            </div>
            <hr className='text-stone-600' />
            <div className='my-4'>
                <h2 className='font-semibold'>Due Decks</h2>
            </div>
            <Suspense fallback={
                <div className='grid lg:grid-cols-4 grid-cols-3 gap-4'>
                    <div className='bg-stone-700 animate-pulse rounded-md h-full w-full'></div>
                    <div className='bg-stone-700 animate-pulse rounded-md h-full w-full'></div>
                    <div className='bg-stone-700 animate-pulse rounded-md h-full w-full'></div>
                    <div className='bg-stone-700 animate-pulse rounded-md h-full w-full'></div>
                </div>
            }>
                <div className='grid lg:grid-cols-4 grid-cols-3 gap-4'>
                    {decks.map((item) => {
                        return (
                            <HomePageDecksCard key={item.id} title={item.name} desc={item.description} deck_id={item.id} count={item._count.flashcards} />
                        )
                    })}
                </div>
            </Suspense>

            <div className='mt-4'>
                <h2>Stats</h2>
            </div>
            <div className='grid grid-cols-2 items-stretch gap-2 h-80 py-4'>
                <div className='w-full p-5 text-stone-500 rounded-md bg-stone-800/50'>
                    No Data
                </div>
                <div className='w-full p-5 text-stone-500 rounded-md bg-stone-800/50'>
                    No Data
                </div>
            </div>
        </div>
    )
}

export default DashboardPage