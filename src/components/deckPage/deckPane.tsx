'use client';

import { GalleryHorizontalEnd } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import FlashcardItem from './FlashcardItem';
import { toast } from 'sonner';

type DeckPageCardType = Omit<cardType, 'deckId' | 'options'>;

type PropsType = {
    id: string,
    name: string,
    desc: string | null,
    flashcards: DeckPageCardType[]
}

type DeckInfoType = {
    name: string,
    desc: string | null,
}

export type editedItemType = Omit<DeckPageCardType, 'id' | 'type'>

const DeckPane = (props: PropsType) => {
    const [cards, setCards] = useState(props.flashcards);
    const [editedCards, setEditedCards] = useState<Record<string, editedItemType>>({});
    const [newCards, setNewCards] = useState<Record<string, DeckPageCardType>>({})
    const [deckInfo, setDeckInfo] = useState<DeckInfoType>({ name: props.name, desc: props.desc });
    const [deckInfoUpdated, setDeckInfoUpdated] = useState<Partial<DeckInfoType>>({});

    const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

    const divRef = useRef<HTMLDivElement>(null)

    const hasChanged = Object.keys(editedCards).length > 0 || Object.keys(deckInfoUpdated).length > 0 || Object.keys(newCards).length > 0 || deletedIds.size > 0;

    const handleUpdateDb = async () => {
        try {
            const response = await fetch('/api/update-cards', {
                method: 'POST',
                body: JSON.stringify({
                    deck_id: props.id,
                    deckInfo: deckInfoUpdated,
                    deletedIds: Array.from(deletedIds),
                    newCards: Object.values(newCards),
                    editedCards: editedCards
                })
            })

            if (response.status !== 200) {
                const error = response.json();
                console.log(error)
                toast.error("something went wrong");
                return
            }
            toast.success("Changes successfully Saved")

            setNewCards({});
            setEditedCards({});
            setDeletedIds(new Set())

            const deck = await response.json();
            setDeckInfo({name: deck.deck.name, desc: deck.deck.description})
            setCards(deck.deck.flashcards)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
    }

    function handleDeckInfoChange(field: keyof DeckInfoType, value: DeckInfoType[keyof DeckInfoType]) {
        setDeckInfoUpdated((prev) => {
            const updated = {
                ...prev,
                [field]: value
            }

            if (value === deckInfo[field]) {
                delete updated[field];
            }

            return updated
        })
    }

    const handleChange = useCallback(<K extends keyof editedItemType>(id: string, field: K, value: editedItemType[K]) => {
        setEditedCards(prev => {
            const original = cards.find(card => card.id === id);

            if (!original) return prev;

            const updated = {
                ...prev[id],
                [field]: value
            }

            if (value === original[field as keyof editedItemType]) {
                delete updated[field as keyof editedItemType];
            }

            if (Object.keys(updated).length === 0) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [id]: _, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [id]: updated
            }
        })
    }, [cards])

    const handleScrollOnAdd = () => {
        if (divRef.current) {
            divRef.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }

    async function addNewCard() {
        const tempId = crypto.randomUUID();
        const newCard: DeckPageCardType = { id: tempId, front: "", back: "", frontImages: [], backImages: [], type: 'BASIC' };

        setNewCards(prev => ({ ...prev, [tempId]: newCard }))
        handleScrollOnAdd()
    }

    const handleNewCardChange = useCallback((id: string, field: keyof DeckPageCardType, value: DeckPageCardType[keyof DeckPageCardType]) => {
        setNewCards(prev => {
            return (
                {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        [field]: value
                    }
                }
            )
        })
    }, [])

    const handleNewCardDelete = useCallback((id: string) => {
        setNewCards(prev => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        })
    }, [])

    const handleDelete = useCallback((id: string) => {
        setDeletedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, [])

    const handleCancel = () => {
        setNewCards({});
        setEditedCards({});
        setDeletedIds(new Set())
    }

    useEffect(() => {
        const handlePageUnload = (e: BeforeUnloadEvent) => {
            if (hasChanged) {
                e.preventDefault();
            }
            
        }
        window.addEventListener('beforeunload', handlePageUnload);

        return () => {
            window.removeEventListener('beforeunload', handlePageUnload);
        }
    }, [hasChanged])

    return (
        <div className='flex flex-col gap-4 justify-items-start'>
            <div className='sticky top-0 bg-stone-900 pt-2'>
                <div className='flex text-sm'>
                    <div className='grow'>
                        <input className='block w-full p-1 rounded text-2xl outline-0' type="text" value={deckInfoUpdated.name || deckInfo.name} onChange={(e) => handleDeckInfoChange("name", e.target.value)} />
                        {deckInfo.desc && <input className='block w-full p-1 rounded text-base outline-0' type="text" value={deckInfoUpdated.desc || deckInfo.desc} onChange={(e) => handleDeckInfoChange('desc', e.target.value)} />}
                    </div>
                    <div className='flex flex-col justify-end items-end gap-2'>
                        {hasChanged && <div><button onClick={handleCancel} className='px-4 py-2 rounded-md bg-stone-700 font-semibold cursor-pointer'>Cancel</button> <button onClick={handleUpdateDb} className='button_gradient px-4 py-2 rounded-md text-orange-950 font-semibold cursor-pointer'>Save Changes</button></div>}
                        <div>
                            <button className='px-4 py-2 rounded-md bg-stone-700 font-semibold cursor-pointer'>Export</button>
                            <div className='hidden'>
                                <ul>
                                    <li>CSV</li>
                                    <li>APKG</li>
                                    <li>TSV</li>
                                    <li>TXT</li>
                                    <li>XML</li>
                                    <li>MD</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='text-stone-700 my-2' />
            </div>

            <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-col gap-2">
                    {cards.map((flashcard) => {
                        const deleted = deletedIds.has(flashcard.id);
                        return (
                                <FlashcardItem key={flashcard.id} flashcard={flashcard} edited={editedCards[flashcard.id]} handleChange={handleChange} handleDelete={handleDelete} deleted={deleted} />
                        )
                    })}
                </div>
                <div className="flex flex-col gap-2">
                    {Object.values(newCards).map(item => {
                        return (
                            <FlashcardItem key={item.id} flashcard={item} handleChange={handleNewCardChange} handleDelete={handleNewCardDelete} deleted={false} />
                        )
                    })
                    }
                </div>
                <div className='fixed place-self-end bottom-0 text-right p-1' >
                    <button className='flex gap-2 items-center cursor-pointer p-2 button_gradient text-orange-950 font-semibold hover:button_gradient_rev rounded' onClick={addNewCard}><GalleryHorizontalEnd color={'oklch(26.6% 0.079 36.259)'} size={18} /> <span className='text-sm'>Add New Card</span></button>
                </div>
            </div>
            <div ref={divRef} className='h-40'></div>
        </div>
    )
}

export default DeckPane