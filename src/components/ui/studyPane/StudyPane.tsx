"use client";

import { FlagTriangleRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type PropsType = {
    deck_id: string,
    card_id: string,
    question: string,
    answer: string
}

const StudyPane = (props: PropsType) => {
    const [showAns, setShowAns] = useState(false);

    const handleShowButtonClick = () => {
        setShowAns((prev: boolean) => !prev);
    }

    return (
        <>
            <div className='min-h-[89vh] flex flex-col justify-between items-center p-5 m-2 rounded-lg bg-stone-200 dark:bg-stone-800'>
                <div className='place-self-start'>
                    <Link href={"/end-study"} className="rounded-full bg-red-800 cursor-pointer">
                        <div className='bg-red-800 rounded-full p-2'>
                            <FlagTriangleRight />
                        </div>
                    </Link>
                </div>
                <div>
                    <div>
                        {props.question}
                    </div>
                    {showAns &&
                        <div>
                            {props.answer}
                        </div>
                    }
                </div>
                <div className='place-self-end'>
                    <button onClick={handleShowButtonClick} className="rounded-full cursor-pointer">
                        <div className='bg-blue-800 rounded-full p-2'>
                            <RefreshCw />
                        </div>
                    </button>
                </div>
            </div>
            <div className='flex gap-5 justify-center *:cursor-pointer'>
                <button className='py-2 px-4 rounded-lg font-bold text-red-400 hover:text-red-300  hover:bg-red-400/20'>Very Hard</button>
                <button className='py-2 px-4 rounded-lg font-bold text-orange-400 hover:text-orange-300  hover:bg-orange-400/20'>Hard</button>
                <button className='py-2 px-4 rounded-lg font-bold text-yellow-400 hover:text-yellow-300  hover:bg-yellow-400/20'>Good</button>
                <button className='py-2 px-4 rounded-lg font-bold text-green-400 hover:text-green-300  hover:bg-green-400/20'>Easy</button>
                <button className='py-2 px-4 rounded-lg font-bold text-blue-400 hover:text-blue-300  hover:bg-blue-400/20'>Very Easy</button>
            </div>
        </>
    )
}

export default StudyPane