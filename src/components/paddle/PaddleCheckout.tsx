'use client';

import { useEffect, useState } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';

const PaddleCheckout = () => {
    const [paddle, setPaddle] = useState<Paddle>();
    
    useEffect(() => {
        initializePaddle({
            environment: "sandbox",
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
            debug: true,
            
        }).then((instance) => {
            if (instance) {
                setPaddle(instance);
            } else {
                console.warn("instance is not initialize");
            }
        })
    }, []);

    const openCheckout = () => {
        paddle?.Checkout.open({
            settings: {
                theme: "dark"
            },
            items: [{
                priceId: 'pri_01j91mmpybpyj8wx73c76rkr7d',
                quantity: 1
            }],
        })
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-stone-800 shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Buy FlashQuizzr Premium</h1>
            <p className="mb-6 text-stone-100">
                Unlock all features, unlimited cards, and advanced memory tracking.
            </p>
            <ul className="mb-6 text-sm text-stone-100 list-disc pl-4">
                <li>Unlimited flashcards</li>
                <li>Custom spaced repetition algorithm</li>
                <li>Export to Anki, Quizlet, and more</li>
            </ul>
            <button
                onClick={openCheckout}
                className="w-full py-3 text-orange-950 font-semibold button_gradient rounded"
            >
                Subscribe – $4.99/month
            </button>
        </div>
    );
};

export default PaddleCheckout;
