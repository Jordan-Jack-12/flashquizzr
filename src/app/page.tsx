import { FeatureComponent } from "@/components/FeatureComponent";
import { FeatureComponentReverse } from "@/components/FeatureComponentReverse";
import { PricingComponent } from "@/components/PricingComponent";
import { TestimonialComponent } from "@/components/TestimonialComponent";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <div className="fixed top-0 right-0 left-0 z-50 bg-white container py-4 flex items-center justify-between font-bold mx-auto">
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

        <section id="hero" className="w-screen mt-10 h-[70vh] ">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold tracking-tighter"><span className="underline decoration-cyan-500 decoration-wavy">Ace </span>Your Exams</h1>
            <p className="text-md mt-8 text-gray-500">      Effortlessly Create Flashcards and Quizzes </p>
            <p className="text-md text-gray-500 mt-0">Automate Your Study Sessions
            </p>
            <div className="mt-20 flex gap-x-8">
              <Link href={""}>
                <button className="py-2 px-6 border-2 border-cyan-500 text-cyan-500 font-semibold rounded-full bg-white hover:drop-shadow-lg">Watch Demo</button>
              </Link>
              <Link href={""}>
                <button className="py-2 px-6 border-2 border-cyan-500 rounded-full text-white bg-cyan-500 font-bold hover:drop-shadow-lg">Generate Flashcards</button>
              </Link>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="container flex flex-col items-center ">
          <h2 className="text-4xl font-bold tracking-tighter mb-8">How it works?</h2>
          <video controls height={"720"} width="1024" className="rounded-md">
            <source src="/samplevid.mp4" type="video/mp4" />
          </video>
        </section>

        <section id="feature" className="container flex flex-col items-center pt-12">
          <h2 className="text-4xl font-bold tracking-tighter">Why Choose FlashQuizzr?</h2>

          <FeatureComponent title="Save Your Time" paragraph="Traditional study methods can be inefficient and time-consuming. FlashQuizzr automates the creation of study materials, allowing you to focus on learning." img_src="/time.svg" />

          <FeatureComponentReverse title="Boost Confidence" paragraph="With personalized quizzes and flashcards, you'll feel more prepared and confident in your knowledge, ready to impress professors and parents." img_src="/confidence.svg" />

          <FeatureComponent title="Retain Information Longer" paragraph="FlashQuizzr's advanced spaced repetition system optimizes learning by scheduling reviews for better retention. Stay on track and achieve your academic goals with ease." img_src="/retain.svg" />

          <FeatureComponentReverse title="Seamless Integration" paragraph="Easily export your curated quizzes and flashcards to Anki and Quizlet, ensuring your study materials are accessible across platforms for seamless learning anytime, anywhere." img_src="app_int.svg" />

        </section>

        <section id="testemonial" className="container flex flex-col items-center ">
          <h2 className="text-4xl font-bold tracking-tighter">What Our Users Are Saying</h2>
          <p className="mt-8 text-base italic text-gray-600">Read the feedback from students who have achieved their academic goals with us</p>
          <div className="flex flex-wrap gap-x-12 mt-12">
            <TestimonialComponent reviewerName="Sara L" reviewer="Student" review_text="This app has transformed my study sessions. The AI-generated quizzes are spot on, and the spaced repetition feature has really helped me retain more information. I highly recommend it!" imgAlt="Sara L review" imgSrc="/profile_img.svg" />
            <TestimonialComponent reviewerName="Mark R" reviewer="High School Student" review_text="As a busy student, I don't have time to create study materials from scratch. This app does all the heavy lifting for me, and my grades have never been better. It's a game-changer." imgAlt="Mark R pic" imgSrc="/profile_img.svg" />
            <TestimonialComponent reviewerName="Emily K" reviewer="Graduate Student" review_text="The seamless integration with Anki makes it so easy to stay on top of my study goals. The AI-generated questions are incredibly accurate and relevant to my courses." imgSrc="/profile_img.svg" imgAlt="Emily K pic" />
          </div>
        </section>

        <section id="pricing" className="w-screen flex flex-col items-center ">
          <h2 className="text-4xl font-bold mt-20 tracking-tighter">Get Started with the Perfect Plan</h2>
          <div className="flex mt-12 gap-x-12">
            <PricingComponent plan_name="Basic" price="5" period="month" access_list={["Generate Quiz", "Generate FlashCards", "Export Quiz and Flashcard", "100K tokens"]} />
            <PricingComponent plan_name="Pro" price="15" period="month" access_list={["All Basic Feature", "Spaced Repetition", "Managing Quiz and Flashcards"]} />
          </div>
        </section>

        <section id="faqs" className="w-screen flex flex-col items-center">
          <h2 className="text-4xl font-bold mt-20 tracking-tighter">FAQs</h2>
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold">What is the purpose of this app?</h3>
            <h3 className="text-2xl font-semibold">How does the AI generate questions and flashcards?</h3>
            <h3 className="text-2xl font-semibold">Can I customize the generated quizzes and flashcards?</h3>
            <h3 className="text-2xl font-semibold">How do I export the generated content to my spaced repetition software?</h3>
            <h3 className="text-2xl font-semibold">Is there an inbuilt spaced repetition feature?</h3>
            <h3 className="text-2xl font-semibold">Is there a free trial available?</h3>
          </div>
        </section>

        <section id="cta" className="w-screen flex flex-col items-center ">
          <h2 className="text-4xl font-bold mt-20">Start Learning Today</h2>
          <p className="text-base text-gray-700 mt-4">Sign up today to start a more efficient and successful learning journey,</p>
          <p className="text-base text-gray-700"> and leave behind the frustration of disappointing results.</p>
          <Link href={""} className="mt-8 px-4 py-2 bg-cyan-500 rounded-full text-white">Start Free Trial</Link>
        </section>

      </main>

      <footer>
        <div className="container flex flex-wrap items-center justify-between mx-auto border-b border-b-gray-400">
          <div className="flex flex-col">
            <div>
              <h2 className="text-md font-bold">FlashQuizzr</h2>
            </div>
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
          <div className="grid grid-cols-3 gap-x-12 items-start">
            <div className="flex flex-col"><span className="font-semibold">Links</span></div>
            <div className="flex flex-col"><span className="font-semibold">Resources</span></div>
            <div className="flex flex-col"><span className="font-semibold">Contact</span></div>
          </div>
        </div>
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span>copyright 2024 FlashQuizzr</span>
          <span><a>privacy policy</a><a>terms and conditions</a></span>
        </div>
      </footer>
    </>
  );
}
