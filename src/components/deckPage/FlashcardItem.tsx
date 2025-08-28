'use client';
import { ImagePlus, Trash, Undo2 } from "lucide-react";
import React, { memo } from "react";
import { editedItemType } from "./deckPane";

type DeckPageCardType = Omit<cardType, 'deckId' | 'options'>;

const FlashcardItem = memo(function FlashcardItem({ flashcard, edited, handleChange, handleDelete, deleted }:
    {
        flashcard: DeckPageCardType,
        edited?: editedItemType,
        handleChange: (id: string, field: keyof editedItemType, value: editedItemType[keyof editedItemType]) => void,
        handleDelete: (id:string) => void,
        deleted: boolean,
    }) {

    const handleTextAreaSize = (el: EventTarget & HTMLTextAreaElement) => {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + "px";
    }

    const current = edited ? { ...flashcard, ...edited } : flashcard;

    return (
        <div className={`flex justify-around gap-2 bg-stone-800 p-4 rounded-md ${deleted ? 'opacity-50': ""}`} >
            <div className='rounded text-stone-400 hover:text-stone-200 cursor-pointer'>
                <ImagePlus />
            </div>
            <div className='grow-1 grid grid-cols-2 gap-2'>
                <div className='border-2 border-dashed border-stone-700'>
                    <span className='text-sm text-stone-600 px-2'>front</span>
                    <textarea className='block h-auto w-full resize-none p-1 rounded text-base outline-0 focus:bg-stone-700/50' value={current.front}
                        onChange={(e) => {
                            handleChange(flashcard.id, "front", e.target.value)
                            handleTextAreaSize(e.target)
                        }} />
                    <div className='h-auto'>
                        {flashcard.frontImages.map((item, i) => <div key={i} className='h-40 w-50'>{item}</div>)}
                    </div>
                </div>
                <div className='border-2 border-dashed border-stone-700'>
                    <span className='text-sm text-stone-600 px-2'>back</span>
                    <textarea className='block h-auto w-full resize-none p-1 rounded text-base outline-0 focus:bg-stone-700/50' value={current.back}
                        onChange={(e) => {
                            handleChange(flashcard.id, "back", e.target.value)
                            handleTextAreaSize(e.target);
                        }} />
                    <div className='h-auto'>
                        {flashcard.backImages.map((item, i) => <div key={i} className='h-40 w-50'>{item}</div>)}
                    </div>
                </div>
            </div>
            <div className='rounded text-stone-400 hover:text-stone-200 cursor-pointer'>
                <ImagePlus />
            </div>
            <div className='justify-self-end hover:text-red-500 *:cursor-pointer'>
                <button onClick={() => handleDelete(current.id)}>
                    {!deleted ? <Trash /> : <Undo2 />}
                </button>
            </div>
        </div>
    )
})

export default FlashcardItem