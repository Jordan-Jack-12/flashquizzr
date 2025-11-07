'use client';

import { getQuizQuestions } from '@/actions/quiz/quiz-actions';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

type PropsType = {
    deck_id: string,
}

type QuestionType = {
    id: string,
    front: string,
    frontImages: string[],
    back: string,
    backImages: string[],
    options: string[],
}

// type AnswerType = {
//     id: string,
//     answer: string,
// }

function QuizPane({deck_id} : PropsType) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    // const [quizSessionId, setQuizSessionId] = useState<string | null>(null)
    // const [answers, setAnswers] = useState<AnswerType[]>([]);

    async function getQuestions() {
        try {
            const formdata = new FormData();
            formdata.append('deck-id', deck_id)
            const res = await getQuizQuestions(formdata);

            if (res.success == false || res.data == undefined) {
                toast.error(res.message);
                return ;
            }

            setQuestions(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {questions.map((item, index) => {
                return (
                    <div key={index}>
                        <h3>{item.front}</h3>
                        <p>{item.back}</p>
                        {item.options.map((o, i) => {
                            return <p key={i}>{o}</p>
                        }
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default QuizPane