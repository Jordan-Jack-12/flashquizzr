/* eslint-disable @next/next/no-img-element */
"use client";

import { generateFlashcardFromImage } from '@/actions/generate/Flashcards';
import { saveDeckAndFlashcards } from '@/actions/save-deck-and-flashcards/action';
import CardItem from '@/components/generatePage/cardItem';
import { ArrowUpFromLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

function ImageForm() {
    const [image, setImage] = useState<string | null>(null);
    const [cards, setCards] = useState<Omit<cardType, 'id' | 'deckId'>[]>([]);
    const [name, setName] = useState<string>("New Deck");
    const [description, setDescription] = useState<string>("New Deck generated from images.");

    const [loading, setLoading] = useState(false);
    const [generated, setGenerated] = useState(false);

    const fileInputRef = useRef<null | HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const handleScrollOnGenerate = () => {
        if (!divRef.current) return
        divRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log("file dropped");
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>): void {
        const selectedFiles = Array.from(event.target.files || []).filter(file => file.type === "image/jpeg");
        console.log("Selected files:", selectedFiles);
        if (event.target.files && event.target.files[0]) setImage(URL.createObjectURL(event.target.files[0]))
    }

    async function handleGenerate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            const formdata = new FormData(e.currentTarget);
            formdata.append('imag', "fdsfkd")
            const response = await generateFlashcardFromImage(formdata);
            if (response.errors || response.success === false) {
                toast.error(`${response.errors?.aiModel![0]}, ${response.errors?.prompt![0]}, ${response.errors?.type![0]}, ${response.errors?.noOfCards![0]}`)
                setLoading(false);
                return;
            }

            const resData = response.data;
            if (!resData || !resData.cards) {
                toast.error("Something went wrong");
                setLoading(false);
                return;
            }

            setName(resData.name);
            setDescription(resData.desc ?? "");
            setCards(resData.cards);
            toast.success("Successfully Generated");
            setGenerated(true);
            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await saveDeckAndFlashcards({
                name,
                desc: description,
                cards,
            })

            if (!response.success) {
                toast.error("something went wrong");
                setLoading(false);
                return;
            }
            const deckId = response.data?.deckId;
            toast.success("Successfully Saved Deck");
            router.push(`/deck/${deckId}`);
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong");
            setLoading(false);
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

    useEffect(() => {
        return () => {
            if (image) URL.revokeObjectURL(image);
        };
    }, [image]);

    return (
        <>
            <form onSubmit={handleGenerate} className="flex flex-col my-4 gap-2">
                <div
                    id="drop-zone"
                    className="flex flex-col min-h-[88vh] text-stone-400 text-center justify-center border-2 border-dashed rounded-lg border-stone-300 dark:border-stone-600"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {image ?
                        <div className='flex justify-center items-center overflow-y-auto'>
                            <img src={image} alt='image' />
                        </div> :

                        <>
                            <p>Drag and Drop your Image files here</p>
                            <p>or</p>
                            <input
                                type="file"
                                name='images'
                                accept="image/*"
                                multiple
                                className="hidden"
                                id="fileInput"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                            />
                            <label htmlFor="fileInput">
                                <button type='button' className='button_gradient px-4 py-2 rounded text-orange-950 font-bold cursor-pointer' onClick={() => { if (fileInputRef.current != null) fileInputRef.current.click() }}>
                                    Browse PDFs
                                </button>
                            </label>
                        </>
                    }
                </div>

                <div className='flex gap-2 justify-end *:focus:outline-2 *:focus:outline-orange-500'>
                    <select name="ai-model" id="ai-model" className='rounded-lg bg-orange-100 dark:bg-stone-900'>
                        <option value="chat-gpt">Chat Gpt 40 mini</option>
                        <option value="gemini">Gemini flash 2.0</option>
                    </select>
                    <select name="no-of-cards" id="no-of-cards" className='rounded-lg bg-orange-100 dark:bg-stone-900'>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <button disabled={loading} type='submit' className='button_gradient cursor-pointer px-4 py-2 rounded text-orange-950 font-bold '>
                        Generate
                    </button>
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
                    <button disabled={loading} className='flex gap-2 button_gradient py-2 px-4 rounded text-orange-950 font-bold cursor-pointer' onClick={handleSave}>Edit and Save</button>
                </div>
            }
        </>
    )
}

export default ImageForm