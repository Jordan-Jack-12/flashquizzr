import Link from "next/link";
// import Image from "next/image";
import TopNavBar from "@/components/ui/TopNavBar";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <TopNavBar />
      <main className="flex flex-col items-center scroll-smooth scroll-pt-18">
        <section id="home" className="container mt-2 sm:mt-1 sm:h-[70vh] sm:grid sm:grid-cols-1">
          <div className="place-self-center">
            <h1 className="text-3xl mt-5  md:text-4xl font-bold tracking-tighter sm:leading-[3.75rem] px-2.5 sm:px-0 sm:text-center">When You Actually Need to Remember Stuff</h1>
            <p className="text-base mt-8 text-stone-600 dark:text-stone-400 px-2.5 place-self-start sm:text-xl sm:place-self-center">Flashcards and quizzes that go beyond “just okay.”</p>
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
        <section id="demo" className="max-w-5xl container mt-5">
          <h2 className="text-2xl font-semibold px-2.5 sm:text-center sm:mb-5">How FlashQuizzr Works?</h2>
          <div className="h-48 sm:h-96 sm:mx-5 button_gradient flex justify-center items-center">
            <div className="h-9 w-9 bg-gray-800 rounded-full flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide animate-spin lucide-circle-play-icon lucide-circle-play"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
            </div>
          </div>
        </section>
        <section className="max-w-5xl container mt-5" id="feature">
          <h2 className="text-2xl font-semibold px-2.5 sm:text-center">Why Flashquizzr?</h2>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5 sm:mt-0">AI-Generated Flashcards</h3>
              <p className="px-2.5 mt-2.5">Paste your topic, and boom—flashcards made for you in seconds. Let the robots do the heavy lifting (for once).</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient sm:-order-1">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5 sm:mt-0">Edit With Ease</h3>
              <p className="px-2.5 mt-2.5">Tweak. Fine-tune. Add that one weird mnemonic only you understand. You&apos;re the boss.</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5 sm:mt-0">Self-Quiz & Review</h3>
              <p className="px-2.5 mt-2.5">Multiple-choice? Classic flashcard mode? Flashquizzr lets you quiz the way your brain likes best.</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5 sm:mt-0">Study Stats That Actually Matter</h3>
              <p className="px-2.5 mt-2.5">Know what you&apos;ve reviewed, what&apos;s left, and whether you&apos;re crushing it—or need a snack break.</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5 sm:mt-0">Gentle Nudges, Not Nagging</h3>
              <p className="px-2.5 mt-2.5">Set smart reminders so your brain doesn&apos;t ghost your flashcards.</p>
            </div>
          </div>
          <div className="mt-5 sm:grid sm:grid-cols-2">
            <div className="h-48 w-full button_gradient">
              Image
            </div>
            <div>
              <h3 className="mt-4 text-xl font-bold px-2.5 sm:mt-0">Export Your Decks Anywhere</h3>
              <p className="px-2.5 mt-2.5">Want to take your decks to another app? Do it. We won&apos;t be mad. (But we&apos;ll miss you.)</p>
            </div>
          </div>
        </section>
        <section className="max-w-5xl container mt-5 sm:hidden">
          <h2 className="text-2xl font-semibold px-2.5">Who&apos;s Flashquizzr For?</h2>
          <ul className="px-2.5 list-disc list-inside">
            <li>Students prepping for exams without a meltdown</li>
            <li>Busy learners who don&apos;t have time to organize everything manually</li>
            <li>Anyone who wants to retain more, scroll less, and stress way less</li>
          </ul>
        </section>
        <section id="pricing" className="max-w-5xl container mt-5">
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
              <Link href={"/signup"} className={`mt-12 py-2 px-4 button_gradient text-orange-950 text-center font-semibold rounded-md`}>Start for Free </Link>
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
              <Link href={"/signup"} className={`mt-12 py-2 px-4 button_gradient text-orange-950 text-center font-semibold rounded-md`}>Start Free Trial</Link>
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
              <Link href={"/signup"} className={`mt-12 py-2 px-4 button_gradient text-orange-950 text-center font-semibold rounded-md`}>Start Free Trial</Link>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section id="faq" className="max-w-5xl container mt-5">
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
      <Footer />
    </>
  );
}
