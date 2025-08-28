import React from 'react'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { getSessionUserID } from '@/actions/auth/session/getUserBySessionId'
import { redirect } from 'next/navigation'

const ProfilePge = async () => {
    const session_id = (await cookies()).get("session_id")?.value
    const userId = await getSessionUserID(session_id!)

    if (!userId || !session_id) {
        redirect("/login");
    }

    const user = await prisma.profile.findUnique({
        where: {id: userId}
    })

    return (
        <div className='flex flex-col gap-2 justify-start '>
            <div className='m-4 mb-6 p-3 self-start rounded-full bg-orange-400 overflow-hidden'>
                <Image src={"/location.png"} alt='' width={256} height={256}/>
            </div>
            <div>
                <span>Name</span>
                <input type="text" name="name" value={user?.firstName + " " + user?.lastName} className='w-full rounded-lg px-4 py-2 outline-0 focus:outline-2 border border-stone-700 focus:outline-orange-500 bg-stone-200 dark:bg-stone-800' readOnly/>
            </div>
            <div>
                <span>Email</span>
                <input type="email" name="email" value={user?.email} className='w-full rounded-lg px-4 py-2 outline-0 focus:outline-2 border border-stone-700 focus:outline-orange-500 bg-stone-200 dark:bg-stone-800' readOnly/>
            </div>
            <div>
                <span>Password</span>
                <input type="password" name="password" className='w-full rounded-lg px-4 py-2 outline-0 focus:outline-2 border border-stone-700 focus:outline-orange-500 bg-stone-200 dark:bg-stone-800' readOnly/>
            </div>
            <div className='flex justify-end gap-3 *:cursor-pointer'>
                <button className='py-2 px-4 bg-stone-800 hover:bg-stone-700 rounded-md'>Cancel</button>
                <button className='py-2 px-4 button_gradient rounded-md'>Save</button>
            </div>
        </div>
    )
}

export default ProfilePge