'use client'

import { getCustomerPortalSession } from '@/utils/paddle/get-customer-portal-session'
import React from 'react'
import { toast } from 'sonner'

function CustomerPortalButton() {

    async function redirectToCustomerPortal() {
        try {
            const customerPortalUrl = await getCustomerPortalSession()
            if (!customerPortalUrl) {
                toast.error('something went wrong');
                return 
            }
            window.open(customerPortalUrl, '_blank', 'noopener,noreferrer')

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('something went wrong')
        }
    }
    return (

            <button onClick={redirectToCustomerPortal} className='px-4 py-2 rounded-md text-black bg-stone-300 dark:text-white dark:bg-stone-800 cursor-pointer'>
                Open Portal
            </button>
    )
}

export default CustomerPortalButton