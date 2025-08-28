'use client';

import { logOut } from '@/actions/auth/actions';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

type UserType = {
    email: string,
    firstName: string,
    lastName: string
}

function SideBarProfileButton({ user }: { user: UserType }) {
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null)

    function handleProfileMenuOutsideClick(e: MouseEvent) {
        if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
            setOpenProfileMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleProfileMenuOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleProfileMenuOutsideClick)
        }
    }, [])

    return (
        <div ref={profileMenuRef} className='z-10 relative flex gap-2 p-2 justify-between items-center bg-stone-800 rounded-lg' onClick={() => setOpenProfileMenu(!openProfileMenu)}>
            <div className='flex gap-2 items-center w-full'>

                {user ?
                    <>
                        <div className='cursor-pointer'>
                            <UserCircle />
                        </div>
                        <div className='cursor-pointer overflow-hidden'>
                            <h2 className='text-sm truncate'>{user.firstName + " " + user.lastName}</h2>
                            <p className='text-xs truncate'>{user?.email}</p>
                        </div>
                    </>
                    :
                    <>
                        <div className=' cursor-pointer'>
                            <div className='w-8 h-8 bg-stone-700 rounded-full animate-pulse'>

                            </div>
                        </div>
                        <div className='cursor-pointer w-full *:bg-stone-700 *:rounded'>
                            <div className='h-4 w-full animate-pulse mb-1'></div>
                            <div className='h-4 w-full animate-pulse'></div>
                        </div>
                    </>

                }
            </div>
            {openProfileMenu && <div className='absolute text-base bottom-14 bg-stone-800 border border-stone-700 rounded-md p-2 *:hover:bg-stone-700/50 *:rounded-sm *:w-full'>
                <Link className='block px-3 py-1' href={'/settings/profile'}>Profile</Link>
                <Link className='block px-3 py-1' href={'/billing'}>Billing</Link>
                <Link className='block px-3 py-1' href={'/settings'}>Setting</Link>
                <Link className='block px-3 py-1' href={'/help'}>Help</Link>
                <button className='block px-3 py-1 cursor-pointer text-left' onClick={() => { logOut() }}>Log Out</button>
            </div>
            }
        </div>
    )
}

export default SideBarProfileButton