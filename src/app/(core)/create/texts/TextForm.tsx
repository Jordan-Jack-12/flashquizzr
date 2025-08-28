"use client";

import { generateFlashcard } from '@/actions/generate/Flashcards';
import { saveDeckAndFlashcards } from '@/actions/save-deck-and-flashcards/action';
import CardItem from '@/components/generatePage/cardItem';
import { ArrowUpFromLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

const TextForm = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [aiModel, setAiModel] = useState<string>("chat-gpt");
    const [noOfCards, setNoOfCards] = useState<number>(10);
    const [cards, setCards] = useState<Omit<cardType, 'id' | 'deckId'>[]>([]);
    const [name, setName] = useState<string>("New Deck");
    const [description, setDescription] = useState<string>("New Deck created using texts");
    
    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState(false);

    const divRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const handleScrollOnGenerate = () => {
        if (!divRef.current) return
        divRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            prompt: prompt,
            aiModel: aiModel,
            noOfCards: noOfCards,
            type: 'text',
        }
        try {
            setLoading(true);
            const response = await generateFlashcard(data)
            if (response.errors || response.success === false) {
                toast.error(`${response.errors?.aiModel![0]}, ${response.errors?.prompt![0]}, ${response.errors?.type![0]}, ${response.errors?.noOfCards![0]}`)
                return
            }

            const resData = response.data;
            if (!resData || !resData.cards) {
                toast.error("Something went wrong")
                return
            }

            setName(resData.name);
            setDescription(resData.desc ?? "");
            setCards(resData.cards);
            toast.success("Successfully Generated");
            setGenerated(true);
            setLoading(false);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Something went wrong!")
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            const response = await saveDeckAndFlashcards({
                name,
                desc: description,
                cards
            })

            if (!response.success) {
                toast.error("something went wrong");
                return;
            }
            const deckId = response.data?.deckId;
            toast.success("Successfully Saved Deck");
            router.push(`/deck/${deckId}`);
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong");
        }
    }

    const handleEditFront = useCallback((index: number, newValue: string) => {
        setCards((prev) => {
            const updated = [...prev];
            updated[index].front = newValue;
            return updated;
        });
    }, [])

    const handleEditBack = useCallback((index: number, newValue: string) => {
        setCards((prev) => {
            const updated = [...prev];
            updated[index].back = newValue;
            return updated;
        });
    }, [])

    const removeCard = useCallback((index: number) => {
        if (cards) {
            setCards(cards.filter((_, i) => i !== index))
        }
    }, [cards])


    useEffect(() => {
        if (cards && cards.length > 0 && generated) {
            handleScrollOnGenerate()
            setGenerated(false);
        }
    }, [cards, generated])

    return (
        <div>
            <form onSubmit={handleGenerate} className='m-2 flex flex-col justify-end gap-2'>
                <textarea
                    placeholder='Type or Enter your text here...'
                    className='w-full min-h-[89vh] rounded-lg px-4 py-2 outline-0 border border-stone-700 focus:outline-2 focus:outline-orange-500 bg-stone-200 dark:bg-stone-800'
                    rows={3}
                    name='content'
                    id='content'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <div className='text-sm flex gap-2 justify-end'>
                    <select
                        name="ai-model"
                        id="ai-model"
                        className='px-3 rounded-lg bg-orange-100 dark:bg-stone-800 border border-stone-700'
                        value={aiModel}
                        onChange={(e) => setAiModel(e.target.value)}
                    >
                        <option value="chat-gpt">Chat Gpt 4-o mini</option>
                        <option value="gemini">Gemini flash 2.0</option>
                    </select>
                    <select
                        name="no-of-cards"
                        id="no-of-cards"
                        className='px-3 rounded-lg bg-orange-100 dark:bg-stone-800 border border-stone-700'
                        value={noOfCards}
                        onChange={(e) => setNoOfCards(Number(e.target.value))}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <button disabled={loading} type='submit' className='button_gradient px-4 py-2 rounded text-orange-950 font-bold '>Generate</button>
                </div>
            </form>
            {cards && cards.length > 0 && <>
                <div ref={divRef} className='h-2 w-full'></div>
                <input type="text" className='block w-full text-2xl font-semibold outline-0' value={name || ""} onChange={(e) => setName(e.target.value)} />
                <input type="text" className='block w-full text-base text-stone-400 outline-0' value={description} onChange={(e) => setDescription(e.target.value)} />
                <hr className='py-2 text-stone-700' />
            </>}
            {cards && cards.length > 0 &&
                <div className='flex flex-col gap-2'>
                    {cards.map((item, index: number) => {
                        return (
                            <CardItem key={index} index={index} front={item.front} back={item.back} handleEditBack={handleEditBack} handleEditFront={handleEditFront} removeCard={removeCard} />
                        )
                    })}
                </div>
            }

            {cards && cards.length > 0 &&
                <div className='sticky bottom-0 right-0 left-0 flex justify-between text-sm bg-white dark:bg-stone-900 py-2 '>
                    <button className='bg-stone-800 p-2 rounded cursor-pointer' onClick={handleScrollOnGenerate}><ArrowUpFromLine size={16} strokeWidth={2} /></button>
                    <button className='flex gap-2 button_gradient py-2 px-4 rounded text-orange-950 font-bold cursor-pointer' onClick={handleSave}>Save</button>
                </div>
            }
        </div>
    )
}

export default TextForm