import Link from 'next/link'
import React from 'react'

function PricingTable() {
    return (
        <div className="sm:grid sm:grid-cols-2 sm:m-2.5 md:grid-cols-3 gap-2.5">
            <div className="p-6 flex flex-col justify-between bg-white dark:bg-stone-800 rounded-md m-2.5 sm:m-0">
                <div className="flex flex-col gap-y-3">
                    <h3 className="text-xl font-bold">
                        Free
                    </h3>
                    <p className="text-stone-600">
                        <span className="line-through">$0</span>
                    </p>
                    <h3 className="text-sm text-stone-700 dark:text-stone-50 font-bold">
                        <span className="text-md align-top font-bold">$</span><span className="text-4xl font-bold">0</span> /forever
                    </h3>

                    <ul className="ml-6 leading-10">
                        <li className="list-disc text-base py-1">3 Flashcard Decks</li>
                        <li className="list-disc text-base py-1">AI Card Generation</li>
                        <li className="list-disc text-base py-1">Self-Quizzing</li>
                        <li className="list-disc text-base py-1">Study Stats</li>
                        <li className="list-disc text-base py-1">Ads (the non-annoying kind)</li>

                    </ul>
                </div>
                <Link href={"/signup"} className={`mt-12 py-2 px-4 bg-stone-700/50 text-center font-semibold rounded-md`}>Current</Link>
            </div>
            {/* Super */}
            <div className="p-6 flex flex-col justify-between bg-white dark:bg-stone-800 rounded-md m-2.5 sm:m-0">
                <div className="flex flex-col gap-y-3">
                    <h3 className="text-xl font-bold">
                        Super
                    </h3>
                    <p className="text-stone-600">
                        <span className="line-through">$7</span> <span className="text-white bg-orange-500 p-1 text-sm rounded-lg">SAVE 0%</span>
                    </p>
                    <h3 className="text-sm text-stone-700 dark:text-stone-50 font-bold">
                        <span className="text-md align-top font-bold">$</span><span className="text-4xl font-bold">7</span> /month
                    </h3>
                    <ul className="ml-6 leading-10">
                        <li className="list-disc text-base py-1">Everything in Free + No Ads</li>
                        <li className="list-disc text-base py-1">10 Flashcard Decks</li>
                        <li className="list-disc text-base py-1">Full Flashcard Editing</li>
                        <li className="list-disc text-base py-1">Reminder Notifications</li>
                    </ul>
                </div>
                <Link href={"/checkout"} className={`mt-12 py-2 px-4 bg-stone-700/50 text-center font-semibold rounded-md`}>Upgrade</Link>
            </div>
            {/* Premium */}
            <div className="p-6 flex flex-col justify-between bg-white dark:bg-stone-800 rounded-md m-2.5 sm:m-0">
                <div className="flex flex-col gap-y-3">
                    <h3 className="text-xl font-bold">
                        Premium
                    </h3>
                    <p className="text-stone-600">
                        <span className="line-through">$15</span> <span className="text-white bg-orange-500 p-1 text-sm rounded-lg">SAVE 20%</span>
                    </p>
                    <h3 className="text-sm text-stone-700 dark:text-stone-50 font-bold">
                        <span className="text-md align-top font-bold">$</span><span className="text-4xl font-bold">12</span> /month
                    </h3>
                    <ul className="ml-6 leading-10">
                        <li className="list-disc text-base py-1">All Features + Unlimited Decks</li>
                        <li className="list-disc text-base py-1">Full Editing</li>
                        <li className="list-disc text-base py-1">Export Support</li>
                        <li className="list-disc text-base py-1">Email Support</li>
                    </ul>
                </div>
                <Link href={"/checkout"} className={`mt-12 py-2 px-4 bg-stone-700/50 text-center font-semibold rounded-md`}>Upgrade</Link>
            </div>
        </div>
    )
}

export default PricingTable