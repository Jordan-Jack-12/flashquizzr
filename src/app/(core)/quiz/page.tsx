import React from 'react'

const QuizPage = () => {
    return (
        <div className='flex flex-col justify-evenly w-full'>
            <div className='flex gap-1 items-center py-2 text-stone-400 font-bold'><span>Quiz</span></div>
            <div className='mb-4'>
                <h2 className='text-lg font-semibold'>Performance Stats</h2>
                <div className='grid grid-cols-2 grid-rows-4 w-full gap-3 overflow-x-auto'>
                    <div>Total Quizzes </div>
                    <div>: 20</div>
                    <div>Highest Score Percentage </div>
                    <div>: 85%</div>
                    <div>Average Percentage </div>
                    <div>: 70%</div>
                    <div>Property </div>
                    <div>: Value</div>
                </div>
            </div>
            <div>
                <h2 className='text-lg font-semibold'>Recent Quizzes</h2>
                <div className='grid grid-cols-4 gap-3 scroll-bar'>

                </div>
            </div>
        </div>
    )
}

export default QuizPage