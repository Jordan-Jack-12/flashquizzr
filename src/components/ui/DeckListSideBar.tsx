"use client";

import { getDeckListServerAction } from '@/actions/getDeckList';
import { Apple } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react'

type DeckListItem = {
    id: string;
    title: string;
}

const DeckListSideBar = () => {
    const [decks, setDecks] = useState<DeckListItem[]>([]);

    useEffect(() => {
        const getDeckList = async () => {
            const decks = await getDeckListServerAction();
            setDecks(decks);
        }
        getDeckList()
    },[])
    
    return (
        <>
            {decks.map((item) => {
                return (
                    <Suspense key={item.id} fallback={<div className={`flex gap-x-2 h-4 rounded-lg px-4 py-2 font-semibold content-center bg-stone-800 hover:bg-gray-200 dark:hover:bg-stone-800 cursor-pointer`}>ds</div>}>
                    <Link key={item.id} href={`/deck/${item.id}`} className={`flex gap-x-2 rounded-lg px-4 py-2 font-semibold content-center hover:bg-gray-200 dark:hover:bg-stone-800 cursor-pointer`}>
                        <span><Apple /></span>
                        <p className='truncate'>{item.title}</p>
                    </Link>
                    </Suspense>
                )
            })}

        </>
    )
}

export default DeckListSideBar


