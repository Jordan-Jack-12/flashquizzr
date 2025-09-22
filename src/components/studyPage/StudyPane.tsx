'use client';

import { getFirstTenFlashcards } from '@/actions/study/get-first-ten-flashcards';
import { updateFlashcardsDueDate } from '@/actions/study/update-flashcards-due-date';
import { FlagTriangleRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

type PropsType = {
    deck_id: string
}

type ReviewedCardsType = {
    cardId: string,
    deckId: string,
    new: boolean,
    learned: boolean,
    easeFactor: number,
    interval: number,
    repetitions: number,
    dueDate: Date,
    lastReviewed: Date,
    lapses: number
}

type DueCardsType = {
    id: string,
    type: 'BASIC' | 'MCQ' | 'CLOZE' | 'LIST' | 'IMAGE_OCCLUSION';
    front: string;
    back: string;
    frontImages: string[];
    backImages: string[];
    options: string[];
    new: boolean,
    easeFactor: number,
    interval: number,
    repetitions: number,
    dueDate: Date,
    lastReviewed: Date | null,
    lapses: number
}

const StudyPane = ({ deck_id }: PropsType) => {
    const [dueCards, setDueCards] = useState<DueCardsType[]>([]);
    const [reviewedCards, setReviewedCards] = useState<ReviewedCardsType[]>([])
    const [excludeIds, setExcludeIds] = useState<string[]>([]);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [ansVisible, setAnsVisible] = useState(false);

    const router = useRouter();

    const getTenCards = async () => {
        try {
            const formdata = new FormData();
            formdata.append('deck-id', deck_id);
            formdata.append('exclude-ids', JSON.stringify(excludeIds));
            const cardsRes = await getFirstTenFlashcards(formdata);
            if (!cardsRes.success) {
                toast.error(cardsRes.msg);
            }
            if (!cardsRes.data) return;

            const cardsArray: DueCardsType[] = cardsRes.data.filter(i => !excludeIds.includes(i.id));

            if (!cardsArray) return;

            setDueCards(prev => [...prev, ...cardsArray])

            setExcludeIds(prev => [...prev, ...dueCards.map(item => item.id)])
        } catch (error) {
            console.log(error)
        }
    }

    const onShowCardAnswer = () => {
        setAnsVisible(prev => !prev);
    }

    const chooseNextCard = (grade: number) => {
        setAnsVisible(false);
        if (dueCards.length > 0) {
            const card = dueCards[0];
            let easeFactor = card.easeFactor;
            let interval = card.interval;
            let isNewCard = card.new;
            const dueDate = new Date();

            switch (grade) {
                case 0:
                    easeFactor = (card.easeFactor - 0.20 < 0.20) ? 0.20 : (card.easeFactor - 0.20);
                    isNewCard = true;
                    interval = 1;
                    dueDate.setDate(dueDate.getDate() + interval);
                    break;
                case 1:
                    easeFactor = (card.easeFactor - 0.15 < 0.20) ? 0.20 : (card.easeFactor - 0.20);
                    interval = interval * 1.2;
                    isNewCard = isNewCard ? isNewCard : false;
                    dueDate.setDate(dueDate.getDate() + interval);
                    break;
                case 2:
                    // No Ease Factor Change
                    interval = easeFactor;
                    isNewCard = false;
                    dueDate.setDate(dueDate.getDate() + interval);
                    break;
                case 3:
                    easeFactor = card.easeFactor + 0.15;
                    interval = easeFactor * 1.3;
                    isNewCard = false;
                    dueDate.setDate(dueDate.getDate() + interval);
                    break;
                case 4:
                    easeFactor = 2.5;
                    interval = 4;
                    isNewCard = false;
                    break;
            }


            setReviewedCards((prev) => [...prev, {
                cardId: card.id,
                deckId: deck_id,
                new: isNewCard,
                learned: !isNewCard,
                easeFactor: easeFactor,
                interval: interval,
                repetitions: card.repetitions + 1,
                dueDate: dueDate,
                lastReviewed: new Date(),
                lapses: 0,
            }])
            setDueCards(dueCards.filter((item) => item.id !== card.id));
        }
    }

    const finishStudy = async () => {
        if (reviewedCards.length < 1) {
            router.push('/study');
        };
        try {
            const formData = new FormData();
            formData.append('updated-cards', JSON.stringify(reviewedCards));
            const updated = await updateFlashcardsDueDate(formData);
            if (!updated.success) {
                toast.error('Something went wrong!');
                return;
            }
            setReviewedCards([]);
            router.push('/study');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTenCards();
        setFirstLoad(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const updateCards = async () => {
            if (reviewedCards.length < 1) return;
            try {
                const formData = new FormData();
                formData.append('updated-cards', JSON.stringify(reviewedCards));
                const updated = await updateFlashcardsDueDate(formData);
                if (!updated.success) return;
                setReviewedCards([])
            } catch (error) {
                console.log(error);
            }
        }

        const intervalId = setInterval(updateCards, 30000);
        return () => clearInterval(intervalId);

    }, [reviewedCards])

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
                        {dueCards.length < 1 && firstLoad ? "" : "Congrats!!"}
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
                <button onClick={finishStudy} className='py-2 px-4 rounded-lg font-bold text-blue-400 hover:text-blue-300  hover:bg-blue-400/20'>Finish Study</button>
            </div> :
                <div className='flex gap-5 justify-center *:cursor-pointer'>
                    <button onClick={() => chooseNextCard(0)} className='py-2 px-4 rounded-lg font-bold text-red-400 hover:text-red-300  hover:bg-red-400/20'>Very Hard</button>
                    <button onClick={() => chooseNextCard(1)} className='py-2 px-4 rounded-lg font-bold text-orange-400 hover:text-orange-300  hover:bg-orange-400/20'>Hard</button>
                    <button onClick={() => chooseNextCard(2)} className='py-2 px-4 rounded-lg font-bold text-yellow-400 hover:text-yellow-300  hover:bg-yellow-400/20'>Good</button>
                    <button onClick={() => chooseNextCard(3)} className='py-2 px-4 rounded-lg font-bold text-green-400 hover:text-green-300  hover:bg-green-400/20'>Easy</button>
                    <button onClick={() => chooseNextCard(4)} className='py-2 px-4 rounded-lg font-bold text-blue-400 hover:text-blue-300  hover:bg-blue-400/20'>Very Easy</button>
                </div>
            }
        </div>
    )
}

export default StudyPane