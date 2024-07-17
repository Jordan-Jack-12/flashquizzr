import { FeatureComponent } from "@/components/FeatureComponent";
import { FeatureComponentReverse } from "@/components/FeatureComponentReverse";
import { PricingComponent } from "@/components/PricingComponent";
import { TestimonialComponent } from "@/components/TestimonialComponent";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <div className="fixed top-0 right-0 left-0 z-50 bg-white w-screen py-4 flex items-center justify-around font-bold">
          <div>FlashQuizzr</div>
          <nav>
            <ul className="flex justify-around items-center gap-x-4">
              <li>Feature</li>
              <li>Pricing</li>
              <li>Sigin</li>
              <li><a><button className="py-2 px-6 text-white bg-cyan-500 rounded-full">Signup</button></a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex min-h-screen w-screen flex-col items-center justify-start">

        <section id="hero" className="w-screen h-[80vh] bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold tracking-tighter">Ace Your Exams</h1>
            <p className="text-lg mt-8 text-slate-500">Generate Flashcards and Quizzes with AI to prepare for your exams.</p>
            <div className="mt-20 flex gap-x-8">
              <Link href={""}>
                <button className="py-2 px-8 rounded-full bg-white">Watch Demo</button>
              </Link>
              <Link href={""}>
                <button className="py-2 px-8 rounded-full text-white bg-cyan-500 font-bold hover:drop-shadow-lg">Generate Flashcards</button>
              </Link>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <h2 className="text-4xl font-bold tracking-tighter mb-8">How it works?</h2>
          <video controls className="rounded-md">
            <source src="/samplevid.mp4" type="video/mp4" />
          </video>
        </section>

        <section id="feature" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)] pt-12">
          <h2 className="text-4xl font-bold tracking-tighter">Why Choose FlashQuizzr?</h2>

          <FeatureComponent title="AI-Driven Question Generation" paragraph="Save time and enhance your study sessions with AI-generated quizzes and flashcards tailored to your curriculum. No more manual creation—just instant, high-quality study materials." img_src="/samplepic.jpg" />

          <FeatureComponentReverse title="Seamless Spaced Repetition" paragraph="Boost your memory retention with our built-in spaced repetition system. Effortlessly integrate your AI-generated content into an optimized learning schedule." img_src="/samplepic.jpg" />

          <FeatureComponent title="Easy Export to Popular Apps" paragraph="Export your quizzes and flashcards to your favorite spaced repetition apps with just a few clicks. Compatible with Anki, Quizlet, and more." img_src="/samplepic.jpg" />

        </section>

        <section id="testemonial" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <h2 className="text-4xl font-bold tracking-tighter">What Our Users Are Saying</h2>
          <p className="mt-8 text-base text-slate-700">Hear the feedback from students who have achieved their academic goals with us</p>
          <div className="flex flex-wrap w-2/3 gap-x-12 mt-12">
            <TestimonialComponent reviewerName="Sara L" reviewer="Student" review_text="This app has transformed my study sessions. The AI-generated quizzes are spot on, and the spaced repetition feature has really helped me retain more information. I highly recommend it!" imgAlt="Sara L review" imgSrc="/profile_img.svg" />
            <TestimonialComponent reviewerName="Mark R" reviewer="High School Student" review_text="As a busy student, I don't have time to create study materials from scratch. This app does all the heavy lifting for me, and my grades have never been better. It's a game-changer." imgAlt="Mark R pic" imgSrc="/profile_img.svg" />
            <TestimonialComponent reviewerName="Emily K" reviewer="Graduate Student" review_text="The seamless integration with Anki makes it so easy to stay on top of my study goals. The AI-generated questions are incredibly accurate and relevant to my courses." imgSrc="/profile_img.svg" imgAlt="Emily K pic" />
          </div>
        </section>

        <section id="pricing" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <h2 className="text-4xl font-bold mt-20 tracking-tighter">Get Started with the Perfect Plan</h2>
          <div className="flex mt-12 gap-x-12">
            <PricingComponent plan_name="Basic" price="5" period="month" access_list={["Generate Quiz", "Generate FlashCards", "Export Quiz and Flashcard", "100K tokens"]} />
            <PricingComponent plan_name="Pro" price="15" period="month" access_list={["All Basic Feature", "Spaced Repetition", "Managing Quiz and Flashcards"]} />
          </div>
        </section>

        <section id="cta" className="w-screen flex flex-col items-center bg-[rgb(236,251,255)] bg-[radial-gradient(circle, rgba(236,251,255,1) 0%, rgba(247,255,239,1) 100%)]">
          <h2 className="text-4xl font-bold mt-20">Start Learning Today</h2>
          <p className="text-lg mt-4">Generate Flashcards and Quizzes with a click.</p>
          <Link href={""} className="mt-12 px-4 py-2 bg-cyan-500 rounded-full text-white">Start Free Trial</Link>
        </section>

      </main>

      <footer>
        <div className="flex flex-wrap">
          <div className="flex flex-col">
            <div>
              <h2>FlashQuizzr</h2>
            </div>
            <div><p>lorem</p></div>
            <div className="flex flex-wrap gap-4">
              {
                [1, 2, 4, 5, 6].map((item) => {
                  return (
                    <div key={item} className="w-8 h-8 bg-black"></div>
                  )
                })

              }
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex flex-col"></div>
            <div className="flex flex-col"></div>
            <div className="flex flex-col"></div>
          </div>
        </div>
      </footer>
    </>
  );
}
