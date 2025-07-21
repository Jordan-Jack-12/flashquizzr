import React from 'react'
import Image from 'next/image'

const ProfilePge = () => {
    return (
        <div className='flex flex-col gap-2 justify-start '>
            <div className='m-4 mb-6 rounded-full bg-red-300'>
                <Image src={"/location.png"} alt='' width={256} height={256}/>
            </div>
            <div>
                <span>Name</span>
                <input type="text" name="name" className='w-full rounded-lg px-4 py-2 outline-0 focus:outline-2 focus:outline-orange-500 bg-stone-200 dark:bg-stone-900'/>
            </div>
            <div>
                <span>Email</span>
                <input type="email" name="email" className='w-full rounded-lg px-4 py-2 outline-0 focus:outline-2 focus:outline-orange-500 bg-stone-200 dark:bg-stone-900'/>
            </div>
            <div>
                <span>Password</span>
                <input type="password" name="password" className='w-full rounded-lg px-4 py-2 outline-0 focus:outline-2 focus:outline-orange-500 bg-stone-200 dark:bg-stone-900'/>
            </div>
            <div className='flex justify-end'>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    )
}

export default ProfilePge