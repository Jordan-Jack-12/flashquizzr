import React from 'react'
import LinkButton from './ui/LinkButton'

type CreateCardType = {
    title: string,
    description: string | null,
    icon: React.ReactNode | null,
    goto: string
}

const CreateCard = (props: CreateCardType) => {
    return (
        <div className='flex flex-col justify-between w-120 h-[30vh] rounded-lg bg-orange-100 dark:bg-stone-800'>
            <div className='mt-6 mx-4'>
                <h2 className='text-4xl'>{props.title}</h2>
                <p className='text-stone-400'>{props.description}</p>
            </div>
            <div className='mb-6 mx-4 flex justify-end'>
                <LinkButton
                    href={props.goto}
                    content="Create"
                    bg="linear-gradient(135deg, #ff7e5f, #feb47b)"
                    color='#000000'
                />
            </div>

        </div>
    )
}

export default CreateCard