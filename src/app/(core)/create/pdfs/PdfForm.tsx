"use client";

import { generateFlashcardFromPdf } from '@/actions/generate/Flashcards';
import { saveDeckAndFlashcards } from '@/actions/save-deck-and-flashcards/action';
import CardItem from '@/components/generatePage/cardItem';
import { ArrowUpFromLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

const PdfForm = () => {
    const [pdfFile, setPdfFile] = useState<File[]>([]);
    const [cards, setCards] = useState<Omit<cardType, 'id' | 'deckId'>[]>([]);
    const [name, setName] = useState<string>("New Deck");
    const [description, setDescription] = useState<string>("New Deck generated from images.");

    const [generated, setGenerated] = useState(false);
    const [loading, setLoading] = useState(false);

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
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>): void {
        event.preventDefault();
        const selectedFiles = Array.from(event.target.files || []).filter(file => file.type === "application/pdf");
        setPdfFile(selectedFiles)
        console.log("Selected files:", selectedFiles);
    }

    async function handleGenerate(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            formData.append('file-pdf', pdfFile[0])
            console.log("generateing")
            const response = await generateFlashcardFromPdf(formData)
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
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err)
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



    return (
        <div className="flex flex-col my-4 gap-2 text-sm">
            <form onSubmit={handleGenerate}>
                <div
                    id="drop-zone"
                    className="flex flex-col min-h-[88vh] text-stone-400 text-center justify-center border-2 border-dashed rounded-lg border-stone-300 dark:border-stone-600"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {pdfFile.length > 0 ? <p>{pdfFile[0].name}</p> :
                        <>
                            <p>Drag and Drop your PDF files here</p>
                            <p>or</p>
                            <input
                                type="file"
                                name='pdf-file'
                                accept="application/pdf"
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
                        </>}

                </div>

                <div className='flex gap-2 justify-end '>

                    <select name="ai-model" id="ai-model" className='rounded-lg outline-1 outline-stone-700 bg-orange-100 dark:bg-stone-900'>
                        <option value="chat-gpt">Chat Gpt 40 mini</option>
                        <option value="gemini">Gemini flash 2.0</option>
                    </select>
                    <select name="no-of-questions" id="no-of-questions" className='rounded-lg outline-1 outline-stone-700 bg-orange-100 dark:bg-stone-900'>
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
                    <button className='flex gap-2 button_gradient py-2 px-4 rounded text-orange-950 font-bold cursor-pointer' onClick={handleSave}>Save</button>
                </div>
            }
        </div>
    )
}

export default PdfForm