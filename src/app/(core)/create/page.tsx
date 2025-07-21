import CreateCard from '@/components/CreateCard'
import { TypeOutline } from 'lucide-react'
import React from 'react'

const CreatePage = () => {
    return (
        <div className='my-6 flex flex-wrap justify-center gap-2'>
            <CreateCard 
            title="Text"
            description={"generate flashcard from text files and by typing"}
            icon={<TypeOutline />}
            goto={"/create/texts"}
            />
            <CreateCard 
            title="PDF"
            description={"generate flashcard from PDF files"}
            icon={<TypeOutline />}
            goto={"/create/pdfs"}
            />
            <CreateCard 
            title="URL"
            description={"generate flashcard from URL to blog or any texts"}
            icon={<TypeOutline />}
            goto={"/create/url-link"}
            />
        </div>
    )
}

export default CreatePage