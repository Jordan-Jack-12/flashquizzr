import { getAllQuizzes } from '@/actions/quiz/quiz-actions';
import { getRecentQuizzSessions, getTotalQuizSessions } from '@/actions/quiz/quiz-stats'
import Link from 'next/link';
import React from 'react'

const QuizPage = async () => {
    const quizzes = await getTotalQuizSessions();
    const recentQuizzes = await getRecentQuizzSessions();
    const allQuizzes = await getAllQuizzes();

    return (
        <div className='flex flex-col justify-evenly w-full'>
            <div className='w-full bg-orange-200 text-black'>⚠️ Under Construction!</div>
            <div className='flex gap-1 items-center py-2 text-stone-400 font-bold'><span>Quiz</span></div>
            <div className='mb-4'>
                <h2 className='text-lg font-semibold'>Performance Stats</h2>
                <div className='grid grid-cols-2 w-full gap-3 overflow-x-auto'>
                    <div>Total Quizzes </div>
                    <div>: {quizzes.data?.total}</div>
                    <div>Highest Score Percentage </div>
                    <div>: {quizzes.data?.highest}</div>
                    <div>Average Percentage </div>
                    <div>: {quizzes.data?.average}</div>
                </div>
            </div>
            <div>
                <h2 className='text-lg font-semibold'>Recent Quizzes</h2>
                <div className='grid grid-cols-4 gap-3 scroll-bar'>
                    {
                        recentQuizzes.data && recentQuizzes.data.length > 0 ? <>
                        {
                            recentQuizzes.data.map((item, index) => {
                                return (
                                    <div key={item.id}>
                                        <h1>Quiz Session: {index}</h1>
                                        <p>Score: {item.score}</p>
                                        <p>Total: {item.total}</p>
                                        
                                    </div>
                                )
                            })
                        }
                        </> :
                        <>
                        <p>No Recent quizzes</p>
                        </>
                    }
                </div>
            </div>
            <div>
                <h2>All Decks</h2>
                {
                    allQuizzes.data?.map((item, index) => {
                        return (
                            <div key={index}>
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <Link href={'/quiz/' + item.id}>Quiz</Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default QuizPage