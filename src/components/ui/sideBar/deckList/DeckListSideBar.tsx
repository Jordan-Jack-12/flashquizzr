import { getDecks } from '@/data/deck/get-decks';
import DeckListsWrapper from './DeckListsWrapper';
import { Suspense } from 'react';

const DeckListSideBar = async () => {
    const decks = await getDecks({full: false})
    
    return (
        <Suspense fallback={
            <div className='flex flex-col gap-2 *:h-5 *:w-full *:bg-stone-700 *:animate-pulse *:rounded-md'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        }>
            <DeckListsWrapper decks={decks} />
        </Suspense>
    )
}

export default DeckListSideBar


