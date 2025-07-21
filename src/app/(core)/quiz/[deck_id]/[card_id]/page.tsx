"use client";

import { FlagTriangleRight } from 'lucide-react';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'

type QuizPageProps = {
    params: Promise<{
        deck_id: string;
        card_id: string
    }>
}

const CardPage = (props: QuizPageProps) => {
    const { deck_id, card_id } = use(props.params);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState("");

    const setValues = () => {
        setAnswers(deck_id);
        setQuestion(card_id)
    }

    useEffect(() => {
        setValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='min-h-screen flex flex-col gap-2'>
            <div className='min-h-[89vh] flex flex-col justify-between items-center p-5 m-2 rounded-lg bg-stone-200 dark:bg-stone-800'>
                <div className='place-self-start' title='End Quiz'>
                    <Link href={"/end-study"} className="rounded-full bg-red-800 cursor-pointer">
                        <div className='bg-red-800 rounded-full p-2'>
                            <FlagTriangleRight />
                        </div>
                    </Link>
                </div>
                <div>
                    <div>
                        {question}
                    </div>
                    <div>
                        {answers}
                    </div>
                </div>
                <div className='place-self-end'>

                </div>
            </div>
            <div className='flex gap-5 justify-center *:cursor-pointer'>
                <button className='py-2 px-4 rounded-lg font-bold text-red-400 hover:text-red-300  hover:bg-red-400/20'>Very Hard</button>
                <button className='py-2 px-4 rounded-lg font-bold text-orange-400 hover:text-orange-300  hover:bg-orange-400/20'>Hard</button>
                <button className='py-2 px-4 rounded-lg font-bold text-yellow-400 hover:text-yellow-300  hover:bg-yellow-400/20'>Good</button>
                <button className='py-2 px-4 rounded-lg font-bold text-green-400 hover:text-green-300  hover:bg-green-400/20'>Easy</button>
                <button className='py-2 px-4 rounded-lg font-bold text-blue-400 hover:text-blue-300  hover:bg-blue-400/20'>Very Easy</button>
            </div>
        </div>
    )
}

export default CardPage