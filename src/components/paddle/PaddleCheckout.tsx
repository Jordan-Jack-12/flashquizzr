'use client';

import { useEffect, useState } from 'react';
import { CheckoutEventsData, initializePaddle, Paddle } from '@paddle/paddle-js';

type PropsType = {
    email: string,
}

const PaddleCheckout = ({ email }: PropsType) => {
    const [paddle, setPaddle] = useState<Paddle>();
    const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);

    const handleCheckoutEvents = (event: CheckoutEventsData) => {
        setCheckoutData(event);
    };

    useEffect(() => {
        initializePaddle({
            environment: "sandbox",
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
            debug: true,
            eventCallback: (event) => {
                if (event.data && event.name) {
                    handleCheckoutEvents(event.data);
                    console.log(event.data)
                }
            },
            checkout: {
                settings: {
                    variant: 'one-page',
                    displayMode: 'inline',
                    theme: 'dark',
                    allowLogout: !email,
                    frameTarget: 'checkout-container',
                    frameInitialHeight: 450,
                    frameStyle: 'width: 100%; background-color: transparent; border: none',
                    successUrl: '/checkout/success',
                },
            },


        }).then(async (paddle) => {
            if (paddle) {
                setPaddle(paddle);
                paddle.Checkout.open({
                    customer: {
                        email: email,
                    },
                    items: [{
                        priceId: 'pri_01j91mr0m6t08a0kgbz4zkytat',
                        quantity: 1
                    }],
                })
            } else {
                console.warn("instance is not initialize");
            }
        })
    }, [paddle?.Initialized, email]);

    return (
        <div className="flex justify-center w-full mx-auto mt-12 p-6 bg-stone-800 shadow rounded">
            <div className='flex flex-col'>
                <p className='text-sm font-bold text-stone'>Order Summary</p>
                <div>
                    <p className='text-3xl font-bold'>{checkoutData?.totals ? `${new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(checkoutData.totals.total)}` : "Loading..."}</p>
                </div>
                <div>
                    <p className='text-sm'> After free trial</p>
                    {checkoutData?.recurring_totals?.total && new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(checkoutData?.recurring_totals?.total)}
                </div>
            </div>
            <div className='checkout-container'></div>
        </div>
    );
};

export default PaddleCheckout;
