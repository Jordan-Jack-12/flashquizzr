"use client";

import Button from '@/components/ui/Button'
import React, { useRef } from 'react'

const PDFsPage = () => {
    const fileInputRef = useRef<null | HTMLInputElement>(null);
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log("file dropped");

    }

    const handleDragOver = (event : React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
    function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>): void {
        const selectedFiles = Array.from(event.target.files || []).filter(file => file.type === "application/pdf");
        console.log("Selected files:", selectedFiles);
    }

    function handleGenerateButtonClick(): void {
        console.log("generatte flashcards")
    }

    return (
        <div className="flex flex-col my-4 gap-2">
            <div
                id="drop-zone"
                className="flex flex-col min-h-[88vh] text-stone-400 text-center justify-center border-2 border-dashed rounded-lg border-stone-300 dark:border-stone-600"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <p>Drag and Drop your PDF files here</p>
                <p>or</p>
                <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    className="hidden"
                    id="fileInput"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                />
                <label htmlFor="fileInput">
                    <Button content={"Browse Files"} bg="#ffffff" onClick={() => {if (fileInputRef.current != null) fileInputRef.current.click()}}/>
                </label>
            </div>

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
    )
}

export default PDFsPage