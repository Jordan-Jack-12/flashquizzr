import StudyPane from '@/components/studyPage/StudyPane';
import React from 'react'

type PageParams = {
    params: Promise<{
        deck_id: string;
    }>
}

const StudyPageDeck = async (props: PageParams) => {

    const { deck_id } = await props.params;

    return (
        <div className='min-h-screen flex flex-col gap-2'>
            <StudyPane deck_id={deck_id}/>
        </div>
    )
}

export default StudyPageDeck