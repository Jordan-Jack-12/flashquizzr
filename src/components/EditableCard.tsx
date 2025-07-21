import React from 'react'

type EditableCardType = {
    question: string,
    correct_ans: string,
    option1: string,
    option2: string,
    option3: string
}

const EditableCard = (props: EditableCardType) => {
    return (
        <div className='rounded-lg flex flex-col gap-2 px-4 py-2 bg-stone-100 dark:bg-stone-800'>
            <input type="text" value={props.question} className='p-1' readOnly/>
            <hr className='bg-stone-700 text-stone-600'/>
            <input type="text" value={"Answer: " + props.correct_ans} className="p-1" readOnly/>
        </div>
    )
}

export default EditableCard