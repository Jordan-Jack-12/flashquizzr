import { Trash } from 'lucide-react'
import React, { memo } from 'react'

type PropsType = {
    index: number,
    front: string,
    back: string,
    handleEditFront: (index: number, newValue: string) => void,
    handleEditBack: (index: number, newValue: string) => void,
    removeCard: (index: number) => void
}

const CardItem = memo(function CardItem({ index, front, back, handleEditFront, handleEditBack, removeCard }: PropsType) {
    return (
        <div className='rounded-lg flex gap-2 px-4 py-2 bg-stone-100 dark:bg-stone-800'>
            <div className='grow-1 grid grid-cols-2 gap-2'>
                <div className='border-2 border-dashed border-stone-700'>
                    <span className='text-sm text-stone-600 px-2'>front</span>
                    <textarea className='block h-auto w-full resize-none p-1 rounded text-base outline-0 focus:bg-stone-700/50' value={front}
                        onChange={(e) => {
                            handleEditFront(index, e.target.value)
                        }} />
                </div>
                <div className='border-2 border-dashed border-stone-700'>
                    <span className='text-sm text-stone-600 px-2'>back</span>
                    <textarea className='block h-auto w-full resize-none p-1 rounded text-base outline-0 focus:bg-stone-700/50' value={back}
                        onChange={(e) => {
                            handleEditBack(index, e.target.value)
                        }} />
                </div>
            </div>
            <div>
                <button className='cursor-pointer hover:text-red-500' onClick={() => removeCard(index)}><Trash /></button>
            </div>
        </div>
    )
})

export default CardItem