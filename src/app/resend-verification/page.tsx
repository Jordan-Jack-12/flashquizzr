import { resendEmailVerification } from '@/actions/auth/emails'
import React from 'react'

async function ResendVerificationPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
    const token = (await searchParams).token;
    return (
        <div className='text-center text-2xl'>
            Token Expired
            <form action={resendEmailVerification}>
                <input type="hidden" name="token" value={token} />
                <button type='submit' className='text-center text-base cursor-pointer font-bold underline text-orange-400 p-2'>Resend Verification</button>
            </form>
        </div>
    )
}

export default ResendVerificationPage