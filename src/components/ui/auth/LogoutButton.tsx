import { LogOut } from 'lucide-react'
import React from 'react'

const LogoutButton = () => {
    return (
        <div className='flex gap-2 font-semibold px-4 py-2'>
            <LogOut /> Logout
        </div>
    )
}

export default LogoutButton