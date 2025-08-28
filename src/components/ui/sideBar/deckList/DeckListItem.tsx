'use client';

import { ChevronsUpDown, WalletCardsIcon } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"

type DeckListItemType = {
    id: string,
    content: string,
    active: boolean,
    onDelete: (id: string) => void,
}

export const revalidate = 0

const DeckListItem = (props: DeckListItemType) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dropDownMenuRef = useRef<HTMLDivElement>(null);

    function handleOutsideClick(e: MouseEvent) {
        if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(e.target as Node))
        {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    },[])

    return (
        <div  className={`flex gap-x-2 items-center rounded-lg px-4 py-2 font-semibold text-sm ${props.active ? "bg-orange-100/50 text-orange-500 dark:bg-stone-800" : "bg-transparent"} hover:bg-gray-200 dark:hover:bg-stone-800`} >
            <div className="grow overflow-hidden">
                <Link href={`/deck/${props.id}`} className="flex gap-x-2 items-center">
                    <div>
                        <WalletCardsIcon size={18} />
                    </div>
                    <div className="overflow-hidden">
                        <p className="truncate">{props.content}</p>
                    </div>

                </Link>
            </div>
            <div ref={dropDownMenuRef} className="relative" onClick={() => setIsMenuOpen(o => !o)} >
                <button className="text-center align-middle cursor-pointer">
                    <ChevronsUpDown size={16} />
                </button>
                <div className={`absolute flex flex-col text-stone-100 bg-stone-800 border border-stone-700 rounded-md py-2 px-2 right-0 bottom-10 *:cursor-pointer ${isMenuOpen ? "" : "hidden"}`}>
                    <Link href={`/deck/${props.id}`} className="text-left block py-1 px-2 rounded-sm hover:bg-stone-700/50">
                        Edit
                    </Link>
                    <button onClick={() => { props.onDelete(props.id) }} className="text-left block py-1 px-2 rounded-sm hover:bg-stone-700/50">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeckListItem