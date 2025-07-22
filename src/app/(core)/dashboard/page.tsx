import { getSessionUserID } from '@/actions/auth/session/getUserBySessionId';
import HomePageDecksCard from '@/components/HomePageDecksCard'
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {
    const sessionId = (await cookies()).get("session_id")?.value || "";
    if (!sessionId || sessionId === "") {
        redirect("/login");
    }
    const userId = await getSessionUserID(sessionId);
    
    if (!userId) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id:  userId},
        include: {
            decks: true
        },
    });

    if (!user) {
        redirect("/login");
    }


    return (
        <div className='ml-4'>
            <div className='w-full h-20 rounded-lg bg-orange-50 text-black dark:bg-stone-900 dark:text-white'>
                <h1 className='text-3xl text-center font-bold'>Hello, {user.firstName}</h1>

            </div>
            <div className='my-4'>
                <h2 className='font-semibold'>Due Decks</h2>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                {user.decks.map((item) => {
                    return (
                        <HomePageDecksCard key={item.id} title={item.title} img_url='notjig' deck_id={item.id} />
                    )
                })}
            </div>
            <div>
                <h2>Stats</h2>
            </div>
            <div className='flex flex-wrap'>
                <div className='w-xl h-5xl bg-stone-900'>
                    graph
                </div>
                <div className='w-xl h-5xl bg-stone-900'>
                    graph 2
                </div>
            </div>
        </div>
    )
}

export default DashboardPage