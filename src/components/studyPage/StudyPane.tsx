'use client';

import { FlagTriangleRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

type PropsType = {
    deck_id: string
}

type ReviewedCardsType = {
    cardId: string,
    deckId: string,
    easeFactor: number,
    interval: number,
    repetitions: number,
    dueDate: string,
    lastReviewed: string,
    lapses: number
}

type DueCardsType = {
    id: string,
    deckId: string,
    type: "BASIC" | "MCQ" | "CLOZE" | "LIST" | "IMAGE_OCCLUSION";
    front: string;
    back: string;
    front_images: string[];
    back_images: string[];
    options: string[];

    easeFactor: number,
    interval: number,
    repetitions: number,
    lapses: number
}

const StudyPane = ({ deck_id }: PropsType) => {
    const [, setTotalDueCards] = useState<number>(0);
    const [dueCards, setDueCards] = useState<DueCardsType[]>([]);
    const [, setReviewedCards] = useState<ReviewedCardsType[]>([])
    const [excludeIds, setExcludeIds] = useState<string[]>([]);
    const [firstLoad] = useState<boolean>(true);
    const [ansVisible, setAnsVisible] = useState(false);

    const getTotalDueCards = async () => {
        try {
            const countRes = await fetch(`/api/due-cards/${deck_id}`);
            if (countRes.status != 200) {

            }
            const count = (await countRes.json()).count
            setTotalDueCards(count)
        } catch (error) {
            console.log(error)
        }
    }

    const getTenCards = async () => {
        try {
            const cardsRes = await fetch('/api/due-cards', {
                method: 'POST',
                body: JSON.stringify({ deckId: deck_id, excludeIds })
            });
            if (cardsRes.status != 200) {

            }
            const cardsArray = (await cardsRes.json()).cards
            if (!cardsArray) return
            setDueCards(prev => [...prev, ...cardsArray])
            setExcludeIds(prev => [...prev, ...dueCards.map(item => item.id)])
        } catch (error) {
            console.log(error)
        }
    }

    const onShowCardAnswer = () => {
        setAnsVisible(prev => !prev);
    }

    const chooseNextCard = () => {
        setAnsVisible(false);
        if (dueCards.length > 0) {
            const card = dueCards[0]
            setReviewedCards((prev) => [...prev, { 
                cardId: card.id, 
                deckId: card.deckId, 
                easeFactor: 2.5, 
                interval: 12, 
                repetitions: 1,
                dueDate: 'fsafdaf',
                lastReviewed: 'dfsfdsf',
                lapses: 10
            }])
            setDueCards(dueCards.filter((item) => item.id !== card.id));
        }
    }

    // const updateCards = async () => {
    //     try {
    //         const reviewedCardsBody = reviewedCards
    //         if (reviewedCardsBody.length < 1) return
    //         const res = await fetch('/api/due-date-update', {
    //             method: 'POST',
    //             body: JSON.stringify({ reviewedCardsBody })
    //         })
    //         if (!res) return
    //         setReviewedCards(reviewedCards.splice(0, reviewedCardsBody.length))
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        getTotalDueCards();
        getTenCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    // useEffect(() => {
    //     const intervalId = setInterval(updateCards, 30000);
    //     return () => clearInterval(intervalId);
    // }, [])

    return (
        <div className='grid grid-cols-1 w-full'>
            <div className='min-h-[89vh] flex flex-col justify-between items-center p-5 m-2 rounded-lg bg-stone-200 dark:bg-stone-800'>
                <div className='place-self-start'>
                    <Link href={"/end-study"} className="rounded-full  cursor-pointer">
                        <div className='text-stone-500 border-2 border-stone-500 rounded-full p-2'>
                            <FlagTriangleRight />
                        </div>
                    </Link>
                </div>
                {dueCards.length > 0 ?
                    <div>
                        <div>
                            {dueCards[0].front}
                        </div>
                        {ansVisible &&
                            <div className='border-t border-t-stone-500'>
                                {dueCards[0].back}
                            </div>
                        }
                    </div>
                    :
                    <div className={`min-h-8 text-2xl text-center min-w-50 rounded-md ${firstLoad && 'bg-stone-700'}`}>
                        {dueCards.length < 1 && "Congrats!!"}
                    </div>
                }

                <div className='place-self-end'>
                    <button onClick={onShowCardAnswer} className="rounded-full cursor-pointer">
                        <div className='bg-blue-800 rounded-full py-2 flex gap-2 px-4'>
                            <RefreshCw /> {ansVisible ? "Hide Answer" : "Show Answer"}
                        </div>
                    </button>
                </div>
            </div>
            {dueCards.length < 1 ? <div className='flex gap-5 justify-center *:cursor-pointer'>
                <button className='py-2 px-4 rounded-lg font-bold text-blue-400 hover:text-blue-300  hover:bg-blue-400/20'>Finish Study</button>
            </div> :
                <div className='flex gap-5 justify-center *:cursor-pointer'>
                    <button onClick={chooseNextCard} className='py-2 px-4 rounded-lg font-bold text-red-400 hover:text-red-300  hover:bg-red-400/20'>Very Hard</button>
                    <button onClick={chooseNextCard} className='py-2 px-4 rounded-lg font-bold text-orange-400 hover:text-orange-300  hover:bg-orange-400/20'>Hard</button>
                    <button onClick={chooseNextCard} className='py-2 px-4 rounded-lg font-bold text-yellow-400 hover:text-yellow-300  hover:bg-yellow-400/20'>Good</button>
                    <button onClick={chooseNextCard} className='py-2 px-4 rounded-lg font-bold text-green-400 hover:text-green-300  hover:bg-green-400/20'>Easy</button>
                    <button onClick={chooseNextCard} className='py-2 px-4 rounded-lg font-bold text-blue-400 hover:text-blue-300  hover:bg-blue-400/20'>Very Easy</button>
                </div>
            }
        </div>
    )
}

export default StudyPane