import React from 'react'

const Studypage = async () => {

    return (
        <div className='max-h-screen flex flex-col overflow-y-auto justify-evenly ml-4'>
            <div className='mb-4'>
                <h2 className='text-lg font-semibold'>Due Decks</h2>
                <div className='grid grid-cols-4 gap-3'>
                    {/* Map the due decks */}
                </div>
            </div>
            <div>
                <h2 className='text-lg font-semibold'>Recently Reviewed</h2>
                <div className='grid grid-cols-4 gap-3'>
                    {/* Map the decks */}
                </div>
            </div>
        </div>
    )
}

export default Studypage