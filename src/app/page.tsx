import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="w-screen container mx-auto">
        <div className="fixed top-0 right-0 left-0 z-50 bg-black/80 container py-4 flex items-center justify-between font-bold mx-auto px-5 backdrop-blur-md">
          <Link href={'/'} className="flex gap-2">
            <Image src={"/flashquizzrlogo.svg"} height={32} width={32} alt="flashquizzrlogo" />
            <h1 className="text-2xl font-bold">FlashQuizzr</h1>
          </Link>
          <nav>
            <ul className="hidden md:flex justify-around items-center gap-x-4">

              <li><Link href={"/#feature"}>Feature</Link></li>
              <li><Link href={"/#pricing"}>Pricing</Link></li>
              <li><Link href={"/login"}>Login</Link></li>

              <li><Link href={"/signup"}><button className={`py-2 px-6 text-white rounded-md button_gradient`}>Signup</button></Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex flex-col items-center justify-start">
        <div className="h-16"></div>
        <section id="home" className="container mt-2 sm:mt-1 sm:h-[70vh] sm:grid sm:grid-cols-1">
          <div className="place-self-center">
            <h1 className="text-3xl mt-5  md:text-4xl font-bold tracking-tighter sm:leading-[3.75rem] px-2.5 sm:px-0 sm:text-center">When You Actually Need to Remember Stuff</h1>
            <p className="text-base mt-8 text-stone-600 dark:text-stone-400 px-2.5 place-self-start sm:place-self-center">Flashcards and quizzes that go beyond “just okay.”</p>
            <div className="mt-12 mx-2.5 md:mx-auto grid grid-cols-1 md:flex gap-3 items-stretch md:items-center sm:place-self-center">
              <Link href={`/`}>
                <button className={`w-full py-2 px-6 rounded-md button_gradient text-orange-950 font-bold hover:drop-shadow-lg`}>Start Study</button>
              </Link>
              <Link href={"/#demo"}>
                <button className="w-full py-2 px-6 bg-orange-900/30 text-orange-400 font-semibold rounded-md dark:border-orange-300 dark:text-orange-400 hover:drop-shadow-lg">Watch Demo</button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-screen container mt-5">
          <h2 className="text-2xl font-semibold px-2.5 sm:text-center sm:mb-5">How FlashQuizzr Works?</h2>
          <div className="h-48 sm:h-96 sm:mx-5 button_gradient flex justify-center items-center">
            <div className="h-9 w-9 bg-gray-800 rounded-full flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide animate-spin lucide-circle-play-icon lucide-circle-play"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
            </div>
          </div>
        </section>
        <section className="w-screen container mt-5" id="feature">
          <h2 className="text-2xl font-semibold px-2.5 sm:text-center">Why Flashquizzr?</h2>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5">AI-Generated Flashcards</h3>
              <p className="px-2.5">Paste your topic, and boom—flashcards made for you in seconds. Let the robots do the heavy lifting (for once).</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient sm:-order-1">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5">Edit With Ease</h3>
              <p className="px-2.5">Tweak. Fine-tune. Add that one weird mnemonic only you understand. You&apos;re the boss.</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5">Self-Quiz & Review</h3>
              <p className="px-2.5">Multiple-choice? Classic flashcard mode? Flashquizzr lets you quiz the way your brain likes best.</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5">Study Stats That Actually Matter</h3>
              <p className="px-2.5">Know what you&apos;ve reviewed, what&apos;s left, and whether you&apos;re crushing it—or need a snack break.</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5">Gentle Nudges, Not Nagging</h3>
              <p className="px-2.5">Set smart reminders so your brain doesn&apos;t ghost your flashcards.</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5">Export Your Decks Anywhere</h3>
              <p className="px-2.5">Want to take your decks to another app? Do it. We won&apos;t be mad. (But we&apos;ll miss you.)</p>
            </div>
          </div>
        </section>
        <section className="w-screen container mt-5 sm:hidden">
          <h2 className="text-2xl font-semibold px-2.5">Who&apos;s Flashquizzr For?</h2>
          <ul className="px-2.5 list-disc list-inside">
            <li>Students prepping for exams without a meltdown</li>
            <li>Busy learners who don&apos;t have time to organize everything manually</li>
            <li>Anyone who wants to retain more, scroll less, and stress way less</li>
          </ul>
        </section>
        <section className="w-screen container mt-5">
          <h2 className="text-2xl font-semibold px-2.5 sm:text-center">Get Started with the Perfect Plan</h2>
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
              <Link href={"/"} className={`mt-12 py-2 px-4 button_gradient text-white text-center font-semibold rounded-md`}>Start for Free </Link>
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
              <Link href={"/"} className={`mt-12 py-2 px-4 button_gradient text-white text-center font-semibold rounded-md`}>Start Free Trial</Link>
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
              <Link href={"/"} className={`mt-12 py-2 px-4 button_gradient text-white text-center font-semibold rounded-md`}>Start Free Trial</Link>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="w-screen container mt-5">
          <h2 className="text-2xl font-semibold px-2.5 sm:text-center">Frequently Asked Questions</h2>
          {/* q1 */}
          <details className="container duration-300 select-none">
            <summary className="list-none cursor-pointer text-xl font-semibold hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md px-2.5 md:px-5 py-3">
              How does the AI flashcard generation work?
            </summary>
            <div className="px-5 py-3 border-b border-b-stone-300 dark:border-b-stone-700">
              <p className="">
                Just paste your notes, a textbook section, or even a topic title—and our AI will generate high-quality flashcards in seconds. You can edit or add to them anytime.
              </p>
            </div>
          </details>
          {/* q2 */}
          <details className="container duration-300 select-none">
            <summary className="list-none cursor-pointer text-xl font-semibold hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md px-2.5 md:px-5 py-3">
              Can I use Flashquizzr for free?
            </summary>
            <div className="px-5 py-3 border-b border-b-stone-300 dark:border-b-stone-700">
              <p className="">
                Yes! The Free plan gives you access to 3 flashcard decks, AI generation, reminders, stats, and self-quizzing. Ads help keep it free (but we promise—they&apos;re not annoying).
              </p>
            </div>
          </details>
          {/* q3 */}
          <details className="container duration-300 select-none">
            <summary className="list-none cursor-pointer text-xl font-semibold hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md px-2.5 md:px-5 py-3">
              What&apos;s the difference between Super and Premium?
            </summary>
            <div className="px-5 py-3 border-b border-b-stone-300 dark:border-b-stone-700">
              <p className="">
                Super gives you up to 10 decks, no ads, and full editing. Premium unlocks everything: unlimited decks, exports, advanced features, and that VIP study experience.
              </p>
            </div>
          </details>
          {/* q4 */}
          <details className="container duration-300 select-none">
            <summary className="list-none cursor-pointer text-xl font-semibold hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md px-2.5 md:px-5 py-3">
              Can I review flashcards like in Anki or Quizlet?
            </summary>
            <div className="px-5 py-3 border-b border-b-stone-300 dark:border-b-stone-700">
              <p className="">
                Yes! You can review flashcards one by one or quiz yourself with multiple-choice options. Spaced repetition-style updates are on the roadmap too.
              </p>
            </div>
          </details>
          {/* q5 */}
          <details className="container duration-300 select-none">
            <summary className="list-none cursor-pointer text-xl font-semibold hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md px-2.5 md:px-5 py-3">
              Can I export my decks to other apps?
            </summary>
            <div className="px-5 py-3 border-b border-b-stone-300 dark:border-b-stone-700">
              <p className="">
                Absolutely. With Premium, you can export your decks in formats supported by other flashcard apps like Anki or Quizlet.
              </p>
            </div>
          </details>
          {/* q6 */}
          <details className="container duration-300 select-none">
            <summary className="list-none cursor-pointer text-xl font-semibold hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md px-2.5 md:px-5 py-3">
              Do I need to install anything?
            </summary>
            <div className="px-5 py-3 border-b border-b-stone-300 dark:border-b-stone-700">
              <p className="">
                Nope. Flashquizzr runs in your browser, so you can use it on your laptop, tablet, or phone—no downloads, no updates, just flashcards on demand.
              </p>
            </div>
          </details>
        </section>
      </main>
      <footer className="w-screen container mx-auto">
        <div className="container border-t-1 border-stone-900 grid grid-cols-1 lg:grid-cols-2 items-center content-start mx-auto mt-12 px-5">
          <div className="flex flex-col gap-8">
            <div className="flex gap-2">
              <Image src={"/flashquizzrlogo.svg"} height={18} width={18} alt="flashquizzrlogo" />
              <h2 className="text-lg font-bold text-center md:text-left">FlashQuizzr</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M 6 3 C 4.3550302 3 3 4.3550302 3 6 L 3 18 C 3 19.64497 4.3550302 21 6 21 L 18 21 C 19.64497 21 21 19.64497 21 18 L 21 6 C 21 4.3550302 19.64497 3 18 3 L 6 3 z M 12 7 L 14 7 C 14 8.005 15.471 9 16 9 L 16 11 C 15.395 11 14.668 10.734156 14 10.285156 L 14 14 C 14 15.654 12.654 17 11 17 C 9.346 17 8 15.654 8 14 C 8 12.346 9.346 11 11 11 L 11 13 C 10.448 13 10 13.449 10 14 C 10 14.551 10.448 15 11 15 C 11.552 15 12 14.551 12 14 L 12 7 z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M10.053,7.988l5.631,8.024h-1.497L8.566,7.988H10.053z M21,7v10	c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V7c0-2.209,1.791-4,4-4h10C19.209,3,21,4.791,21,7z M17.538,17l-4.186-5.99L16.774,7	h-1.311l-2.704,3.16L10.552,7H6.702l3.941,5.633L6.906,17h1.333l3.001-3.516L13.698,17H17.538z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,14.598V9.402c0-0.385,0.417-0.625,0.75-0.433l4.5,2.598c0.333,0.192,0.333,0.674,0,0.866l-4.5,2.598 C10.417,15.224,10,14.983,10,14.598z"></path>
              </svg>
            </div>
          </div>
          <div className="grid  gap-x-12 g-y-4 mt-4 grid-cols-2 lg:grid-cols-4 lg:gap-x-12 items-start">
            <div className="flex flex-col">
              <span className="text-lg font-semibold">About</span>
              <Link href={"/about"}><span className="text-sm text-stone-600 dark:text-stone-500">About Us</span></Link>
              <Link href={"/team"}><span className="text-sm text-stone-600 dark:text-stone-500">Our Team</span></Link>
              <Link href={"/blog"}><span className="text-sm text-stone-600 dark:text-stone-500">Blog</span></Link>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Product</span>
              <Link href={"/#feature"}><span className="text-sm text-stone-600 dark:text-stone-500">Features</span></Link>
              <Link href={"/#pricing"}><span className="text-sm text-stone-600 dark:text-stone-500">Pricing</span></Link>
              <Link href={"/#demo"}><span className="text-sm text-stone-600 dark:text-stone-500">Demo</span></Link>
              <Link href={"/#faqs"}><span className="text-sm text-stone-600 dark:text-stone-500">FAQs</span></Link>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Support</span>
              <Link href={"/help"}><span className="text-sm text-stone-600 dark:text-stone-500">Help Center</span></Link>
              <Link href={"/contact"}><span className="text-sm text-stone-600 dark:text-stone-500">Contact Us</span></Link>
              <Link href={"/community"}><span className="text-sm text-stone-600 dark:text-stone-500">Community</span></Link>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Legal</span>
              <Link href={"/privacy-policy"}><span className="text-sm text-stone-600 dark:text-stone-500">Privacy Policy</span></Link>
              <Link href={"/terms-of-service"}><span className="text-sm text-stone-600 dark:text-stone-500">Terms of Service</span></Link>
              <Link href={"/cookie-policy"}><span className="text-sm text-stone-600 dark:text-stone-500">Cookies</span></Link>
              <Link href={"/security"}><span className="text-sm text-stone-600 dark:text-stone-500">Security</span></Link>
            </div>
          </div>
        </div>
        <hr className="container mx-auto my-4 px-5 border border-stone-100 dark:border-stone-800" />
        <div className="container lg:container-[100px] flex flex-wrap items-center justify-between mx-auto mb-8 px-5">
          <span className="text-sm">&#169; 2024 FlashQuizzr</span>
          <span className="text-sm">All right reserved. <Link href={"/privacy-policy"} className="text-sm text-orange-500 font-semibold">Privacy Policy</Link><span className="font-semibold text-orange-500"> &#9679; </span><Link href={"/terms-of-service"} className="text-sm text-orange-500 font-semibold">Terms of Service</Link></span>
        </div>
      </footer>
    </>
  );
}
