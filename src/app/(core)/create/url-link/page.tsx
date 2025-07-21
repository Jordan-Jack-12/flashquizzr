"use client";

import EditableCard from '@/components/EditableCard'
import Button from '@/components/ui/Button'
import React, { useRef, useState } from 'react'

type ResultType = {
    question: string,
    answers: {
        correct: string,
        option1: string,
        option2: string,
        option3: string
    }
}

const UrlLink = () => {
    const [textContent, setTextContent] = useState("");
        const [result, setResult] = useState<ResultType[]>();
        //const [result, setResult] = useState<string>();
    
        const textAreaRef = useRef(null);
    
        const handleTextContentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setTextContent(event.target.value);
            if (textAreaRef.current != null) return;
            // textAreaRef.current.style.height = '0px'
    
        }
    
        const handleSaveButtonClick = async () => {
            console.log("file save to the cloud");
        }
    
        const handleGenerateButtonClick = async () => {
            try {
                const res = await fetch("/api/create", {
                    method: 'POST',
                    cache: "no-cache",
                    body: JSON.stringify({ text: textContent })
                })
                const data = await res.json();
                const result = JSON.parse(data.text)
                setResult(result.map((item: ResultType) => {
                    return item;
                }));
            } catch (error) {
                console.log(error)
                window.alert("Something went wrong");
            }
        }
    return (
        <div className='max-h-screen'>
            <div className='m-2 flex flex-col justify-end gap-2'>
                <textarea
                    placeholder='Type or Enter your link to article here...'
                    ref={textAreaRef}
                    value={textContent}
                    className='w-full min-h-[89vh] rounded-lg px-4 py-2 outline-0 focus:outline-2 focus:outline-orange-500 bg-stone-200 dark:bg-stone-900'
                    onChange={handleTextContentChange}
                    rows={3}
                />
                <div className='flex gap-2 justify-end *:focus:outline-2 *:focus:outline-orange-500'>
                    <select name="ai-model" id="ai-model" className='rounded-lg bg-orange-100 dark:bg-stone-900'>
                        <option value="chat-gpt">Chat Gpt 40 mini</option>
                        <option value="gemini">Gemini flash 2.0</option>
                    </select>
                    <select name="no-of-questions" id="no-of-questions" className='rounded-lg bg-orange-100 dark:bg-stone-900'>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <Button
                        content={"Generate"}
                        bg={"#ff00ff"}
                        onClick={handleGenerateButtonClick}
                    />
                </div>
            </div>
            {result && result.length > 0 &&
                <div className='flex flex-col gap-2 mr-5'>
                    {result.map((item: ResultType, index: number) => {
                        return (
                            <EditableCard key={index} question={item.question} correct_ans={item.answers.correct} option1={item.answers.option1} option2={item.answers.option2} option3={item.answers.option3} />
                        )
                    })}
                </div>
            }
            <div className='h-12 hidden'></div>
            {result && result.length > 0 &&
                <div className='fixed w-[70%] bottom-0 bg-white dark:bg-black'>
                    <Button
                    bg='#ffffff'
                    content='Save'
                    onClick={handleSaveButtonClick}
                    />
                </div>
            }
        </div>
    )
}

export default UrlLink