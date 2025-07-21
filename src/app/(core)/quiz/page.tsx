import StudyPageDecksCard from '@/components/StudyPageDecksCard'
import React from 'react'

const QuizPage = () => {
    return (
        <div className='max-h-screen flex flex-col overflow-y-auto justify-evenly ml-4'>
            <div className='mb-4'>
                <h2 className='text-lg font-semibold'>Performance Stats</h2>
                <div className='grid grid-cols-2 grid-rows-4 w-[70wh] gap-3 overflow-x-auto'>
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
                <div className='flex gap-3 overflow-x-auto py-4'>
                    <StudyPageDecksCard img_url='url' title='History' deck_id='eahofsa' />
                    <StudyPageDecksCard img_url='url' title='History' deck_id='eahofsa' />
                    <StudyPageDecksCard img_url='url' title='History' deck_id='eahofsa' />
                    <StudyPageDecksCard img_url='url' title='History' deck_id='eahofsa' />
                    <StudyPageDecksCard img_url='url' title='History' deck_id='eahofsa' />
                    <StudyPageDecksCard img_url='url' title='History' deck_id='eahofsa' />
                    <StudyPageDecksCard img_url='url' title='History' deck_id='eahofsa' />
                    <StudyPageDecksCard img_url='url' title='History' deck_id='eahofsa' />
                    <StudyPageDecksCard img_url='url' title='History' deck_id='eahofsa' />
                </div>
            </div>
        </div>
    )
}

export default QuizPage