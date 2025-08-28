import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SideBarProfileButton from './SideBarProfileButton';
import SideBarButtonList from './SideBarButtonList';
import DeckListSideBar from './deckList/DeckListSideBar';
import getSessionUser from '@/data/user/get-session-user';

const SideBar = async () => {
    const user = await getSessionUser();
    if (!user) return;
    return (
        <div className='flex flex-col gap-1 h-screen sticky top-0 left-0 bottom-0 px-2 md:w-[15%] justify-between bg-stone-800/20'>
            <div className='h-full top-0 left-0 z-50'>
                <div className='p-4'>
                    <Link href={'/'} className="flex ">
                        <div className="w-8 h-8"><Image src={"/flashquizzrlogo.svg"} height={32} width={32} alt="flashquizzrlogo" /></div>
                        <h1 className="text-2xl font-bold">FlashQuizzr</h1>
                    </Link>
                </div>
                <SideBarButtonList />
                <hr className='font-extrabold text-stone-200 dark:text-stone-700' />
                <div className='flex flex-col gap-1'>
                    <span className='text-xs text-center font-semibold py-2'>DECKS</span>
                    <DeckListSideBar />
                </div>
            </div>
            <div className='place-self-end w-full sticky bottom-0 left-0 z-50 '>
                <SideBarProfileButton user={user}/>
            </div>
        </div>
    )
}

export default SideBar