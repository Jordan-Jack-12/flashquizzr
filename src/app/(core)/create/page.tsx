import CreateCard from '@/components/CreateCard'
import { Keyboard, Link, TextCursorInput, File } from 'lucide-react'
import React from 'react'

const CreatePage = () => {
    return (
        <div className='min-w-[70%]'>
            <div className='flex gap-1 items-center py-2 text-stone-400 font-bold'><span>Create</span></div>
            <div className='grid grid-cols-2 justify-center gap-2'>
                <CreateCard
                    title="Text"
                    description={"generate flashcard from text files and by typing"}
                    icon={<TextCursorInput size={76} className='mx-auto' />}
                    goto={"/create/texts"}
                />
                <CreateCard
                    title="PDF"
                    description={"generate flashcard from PDF files"}
                    icon={<File size={76} className='mx-auto' />}
                    goto={"/create/pdfs"}
                />
                <CreateCard
                    title="URL"
                    description={"generate flashcard from URL to blog or any texts"}
                    icon={<Link size={76} className='mx-auto' />}
                    goto={"/create/url-link"}
                />
                <CreateCard
                    title="Manual"
                    description={"create flashcards manually"}
                    icon={<Keyboard size={76} className='mx-auto' />}
                    goto={"/create/manual"}
                />
            </div>
        </div>
    )
}

export default CreatePage