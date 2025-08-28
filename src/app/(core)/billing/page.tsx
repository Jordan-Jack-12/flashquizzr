import CustomerPortalButton from '@/components/billingPage/CustomerPortalButton';
import PricingTable from '@/components/billingPage/PricingTable';
import { getSessionUserID } from '@/data/user/get-session-user-id';
import { prisma } from '@/lib/prisma';
import { capitalizeWord } from '@/utils/capitalize-word';
import { formatDateToDDMMYYYY } from '@/utils/DateTimeString';
import { redirect } from 'next/navigation';
import React from 'react'

const BillingPage = async () => {

    const userId = await getSessionUserID();

    if (!userId || userId === undefined) redirect('/login');

    const subscription = await prisma.subscription.findFirst({
        where: {
            profileId: userId,
            OR: [
                {endDate: {gte: new Date()}},
                {endDate: null}
            ]
        }
    })

    return (
        <main>
            <div className='flex gap-1 items-center py-2 text-stone-400 font-bold'><span>Billing</span></div>
            <section>
                <div className='flex p-4 text-black bg-stone-200 dark:text-white dark:bg-stone-800 rounded-md'>
                    <div className='flex-auto'>
                        <h1 className='font-bold text-base text-stone-400 dark:text-stone-500'>Current Subscription:</h1>
                        <p className='text-2xl font-bold'>{subscription ? capitalizeWord(subscription.plan): "Free"}</p>
                        <div className='flex justify-start gap-2 [&>*:nth-child(even)]:mr-8 mt-6'>
                            <p className='font-semibold text-base text-stone-400 dark:text-stone-500'>Started at:</p>
                            <p>{subscription && formatDateToDDMMYYYY(subscription.startDate)}</p>
                            <p className='font-semibold text-base text-stone-400 dark:text-stone-500'>Ends at:</p>
                            <p>{subscription ? formatDateToDDMMYYYY(subscription.endDate || "") : "Forever"}</p>
                            <p className='font-semibold text-base text-stone-400 dark:text-stone-500'>Days left:</p>
                            <p>24 days</p>
                            <p className='font-semibold text-base text-stone-400 dark:text-stone-500'>Uses left:</p>
                            <p>24/30</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 text-sm font-semibold'>
                        <button className='justify-self-between px-4 py-2 rounded-md text-black bg-stone-300 dark:text-white dark:bg-stone-700/70'>Cancel</button>
                        <button className='justify-self-between px-4 py-2 rounded-md text-white button_gradient dark:text-orange-950 dark:bg-orange-400'>Upgrade</button>
                    </div>
                </div>
            </section>
            <section>
                <p>Manage Billing (via Paddle)</p>
                {subscription ? <CustomerPortalButton />: "Free Plan"}
            </section>
            <section>
                <PricingTable />
            </section>
        </main>
    )
}


export default BillingPage