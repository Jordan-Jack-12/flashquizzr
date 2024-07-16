import { FeatureComponent } from "@/components/FeatureComponent";
import { FeatureComponentReverse } from "@/components/FeatureComponentReverse";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <div className="w-screen my-4 flex items-center justify-around">
          <div>FlashQuizzr</div>
          <nav>
            <ul className="flex justify-around items-center gap-x-4">
              <li>Feature</li>
              <li>Pricing</li>
              <li>Sigin</li>
              <li><a><button className="py-2 px-6 text-white bg-cyan-600 rounded-full">Signup</button></a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex min-h-screen w-screen flex-col items-center justify-start">

        <section id="hero" className="w-screen h-[80vh] bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">Ace Your Exams</h1>
            <p className="text-lg mt-8">Generate Flashcards and Quizzes with AI to prepare for your exams.</p>
            <div className="mt-20 flex gap-x-8">
              <a>
                <button className="py-2 px-8 rounded-full bg-white">Learn More</button>
              </a>
              <a>
                <button className="py-2 px-8 rounded-full text-white bg-cyan-600">Generate Flashcards</button>
              </a>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <h2 className="text-3xl font-bold">How it works?</h2>
          <video height={480} width={640} controls>
            <source src="" type="video/mp4" />
          </video>
        </section>

        <section id="feature" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)] pt-12">
          <h2 className="text-3xl font-bold ">Why Choose FlashQuizzr?</h2>

          <FeatureComponent title="AI-Driven Question Generation" paragraph="Save time and enhance your study sessions with AI-generated quizzes and flashcards tailored to your curriculum. No more manual creation—just instant, high-quality study materials." img_src="" />

          <FeatureComponentReverse title="Seamless Spaced Repetition" paragraph="Boost your memory retention with our built-in spaced repetition system. Effortlessly integrate your AI-generated content into an optimized learning schedule." img_src="" />

          <FeatureComponent title="Easy Export to Popular Apps" paragraph="Export your quizzes and flashcards to your favorite spaced repetition apps with just a few clicks. Compatible with Anki, Quizlet, and more." img_src="" />

        </section>

        <section id="testemonial" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <h2 className="text-3xl font-bold">What Our Users Are Saying</h2>
        </section>

        <section id="pricing" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <h2 className="text-3xl font-bold">Get Started with the Perfect Plan</h2>
        </section>

        <section id="cta" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <h2 className="text-3xl font-bold">Start Learning Today</h2>
          <p className="text-lg">Generate Flashcards and Quizzes with a click.</p>
          <Link href={""} className="px-4 py-2 bg-cyan-500 rounded-full text-white">Start Free Trial</Link>
        </section>

      </main>

      <footer>
        <div>

        </div>
      </footer>
    </>
  );
}
