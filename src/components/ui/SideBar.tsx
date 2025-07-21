"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import SideBarButton from './SideBarButton'
import { Brain, ChartColumnBig, EllipsisVertical, GraduationCap, House, PencilRuler, UserCircle } from 'lucide-react'
import DeckListSideBar from './DeckListSideBar';
import { logOut } from '@/actions/auth/actions';

const SideBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);

    const handleProfileClick = () => {
        router.push("/settings/profile");
    }

    const handleOptionClick = () => {
        setOpenDialog((prev) => !prev);
    }

    return (
        <div className='flex flex-col gap-1 md:min-w-[15%] justify-between'>
            <div className='h-full top-0 left-0 z-50'>
                <div className='m-4'>
                    <Link href={'/'} className="flex ">
                        <div className="w-8 h-8"><Image src={"/flashquizzrlogo.svg"} height={32} width={32} alt="flashquizzrlogo" /></div>
                        <h1 className="text-2xl font-bold">FlashQuizzr</h1>
                    </Link>
                </div>
                <div className='flex flex-col gap-1'>
                    <SideBarButton
                        content={"Home"}
                        href='/dashboard'
                        icon={<House />}
                        active={pathname.split("/").includes("dashboard") ? true : false}
                    />
                    <SideBarButton
                        content={"Create"}
                        href='/create'
                        icon={<PencilRuler />}
                        active={pathname.split("/").includes("create") ? true : false}
                    />
                    <SideBarButton
                        content={"Study"}
                        href='/study'
                        icon={<GraduationCap />}
                        active={pathname.split("/").includes("study") ? true : false}
                    />
                    <SideBarButton
                        content={"Quiz"}
                        href='/quiz'
                        icon={<Brain />}
                        active={pathname.split("/").includes("quiz") ? true : false}
                    />
                    <SideBarButton
                        content={"Stats"}
                        href='/stats'
                        icon={<ChartColumnBig />}
                        active={pathname.split("/").includes("stats") ? true : false}
                    />
                </div>
                <hr className='font-extrabold text-stone-200 dark:text-stone-700' />
                <div className='flex flex-col gap-1'>
                    <span className='text-xs text-center font-semibold'>All Decks</span>
                    <DeckListSideBar />
                </div>
            </div>
            <div className='place-self-end w-full sticky bottom-0 left-0 z-50 '>
                <div className='w-full flex gap-2 p-2 m-2 justify-between items-center bg-stone-800 rounded-lg'>
                    <div className='flex gap-2'>
                        <div className='place-self-center cursor-pointer'  onClick={handleProfileClick}>
                            <UserCircle />
                        </div>
                        <button onClick={handleProfileClick} className='cursor-pointer'>
                            <h2 className='text-sm'>Username</h2>
                            <p className='text-xs'>email@email.com</p>
                        </button>
                    </div>
                    <div className='relative'>
                        <EllipsisVertical size={32} onClick={handleOptionClick} className='cursor-pointer'/>
                        {openDialog && <div className='w-full absolute bottom-10 bg-stone-800 rounded-lg px-4 py-2'>
                            <p>option</p>
                            <p>option</p>
                            <p>option</p>
                            <button onClick={() => {logOut()}}>Log Out</button>
                        </div> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar