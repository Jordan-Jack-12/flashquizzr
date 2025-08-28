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
        <div className='flex flex-col justify-between h-[30vh] rounded-lg bg-orange-100 dark:bg-stone-800'>
            <div className='flex align-start items-center'>
                <div className='text-center mx-auto w-full'>
                    {props.icon}
                </div>
                <div className='mt-6 mx-4'>
<h2 className='text-lg'>{props.title}</h2>
                <p className='text-stone-400'>{props.description}</p>
                </div>
                
            </div>
            <LinkButton
                href={props.goto}
                content="Create"
                bg="linear-gradient(135deg, #ff7e5f, #feb47b)"
                color='#000000'
            />


        </div>
    )
}

export default CreateCard