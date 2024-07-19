import { FaqComponent } from "@/components/FaqComponent";
import { FeatureComponent } from "@/components/FeatureComponent";
import { FeatureComponentReverse } from "@/components/FeatureComponentReverse";
import { PricingComponent } from "@/components/PricingComponent";
import { TestimonialComponent } from "@/components/TestimonialComponent";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <div className="fixed top-0 right-0 left-0 z-50 bg-white container py-4 flex items-center justify-between font-bold mx-auto px-5">
          <div>FlashQuizzr</div>
          <nav>
            <ul className="hidden md:flex justify-around items-center gap-x-4">
              <li><Link href={"/#feature"}>Feature</Link></li>
              <li><Link href={"/#pricing"}>Pricing</Link></li>
              <li><Link href={"https://app.flashquizzr.com/signin"}>Sigin</Link></li>
              <li><Link href={"https://app.flashquizzr.com/signup"}><button className="py-2 px-6 text-white bg-cyan-500 rounded-full">Signup</button></Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex flex-col items-center justify-start">

        <section id="home" className="container mt-10 h-[70vh] ">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold tracking-tighter"><span className="underline decoration-cyan-500 decoration-wavy">Ace </span>Your <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-cyan-500 relative inline-block">
              <span className="relative text-white">Exams</span>
            </span></h1>
            <p className="text-md mt-8 text-gray-500">      Effortlessly Create Flashcards and Quizzes </p>
            <p className="text-md text-gray-500 mt-0">Automate Your Study Sessions
            </p>
            <div className="mt-20 flex gap-x-8">
              <Link href={"/#demo"}>
                <button className="py-2 px-6 border-2 border-cyan-500 text-cyan-500 font-semibold rounded-full bg-white hover:drop-shadow-lg">Watch Demo</button>
              </Link>
              <Link href={"https://app.flashquizzr.com/signup"}>
                <button className="py-2 px-6 border-2 border-cyan-500 rounded-full text-white bg-cyan-500 font-bold hover:drop-shadow-lg">Generate Flashcards</button>
              </Link>
            </div>
          </div>
        </section>

        <section id="demo" className="container flex flex-col items-center justify-center mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter mb-8">How it works?</h2>
          <video controls height={"720"} width="1024" className="rounded-md">
            <source src="/samplevid.mp4" type="video/mp4" />
          </video>
        </section>

        <section id="benefit" className="container flex flex-col items-center pt-12">
          <h2 className="text-4xl font-bold tracking-tighter">Why Choose FlashQuizzr?</h2>

          <FeatureComponent title="Save Your Time" paragraph="Traditional study methods can be inefficient and time-consuming. FlashQuizzr automates the creation of study materials, allowing you to focus on learning." img_src="/time.svg" />

          <FeatureComponentReverse title="Boost Confidence" paragraph="With personalized quizzes and flashcards, you'll feel more prepared and confident in your knowledge, ready to impress professors and parents." img_src="/confidence.svg" />

          <FeatureComponent title="Retain Information Longer" paragraph="FlashQuizzr's advanced spaced repetition system optimizes learning by scheduling reviews for better retention. Stay on track and achieve your academic goals with ease." img_src="/retain.svg" />

          <FeatureComponentReverse title="Seamless Integration" paragraph="Easily export your curated quizzes and flashcards to Anki and Quizlet, ensuring your study materials are accessible across platforms for seamless learning anytime, anywhere." img_src="app_int.svg" />

        </section>

        <section id="testimonial" className="container flex flex-col items-center mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter">What Our Users Are Saying</h2>
          <p className="mt-8 text-base italic text-gray-600">Read the feedback from students who have achieved their academic goals with us</p>
          <div className="flex flex-wrap gap-x-12 mt-12">
            <TestimonialComponent reviewerName="Sara L" reviewer="Student" review_text="This app has transformed my study sessions. The AI-generated quizzes are spot on, and the spaced repetition feature has really helped me retain more information. I highly recommend it!" imgAlt="Sara L review" imgSrc="/profile_img.svg" />
            <TestimonialComponent reviewerName="Mark R" reviewer="High School Student" review_text="As a busy student, I don't have time to create study materials from scratch. This app does all the heavy lifting for me, and my grades have never been better. It's a game-changer." imgAlt="Mark R pic" imgSrc="/profile_img.svg" />
            <TestimonialComponent reviewerName="Emily K" reviewer="Graduate Student" review_text="The seamless integration with Anki makes it so easy to stay on top of my study goals. The AI-generated questions are incredibly accurate and relevant to my courses." imgSrc="/profile_img.svg" imgAlt="Emily K pic" />
          </div>
        </section>

        <section id="pricing" className="container flex flex-col items-center ">
          <h2 className="text-4xl font-bold mt-20 tracking-tighter">Get Started with the Perfect Plan</h2>
          <p className="mt-8 text-base italic text-gray-600">Get started now and enjoy our special discounted rates for a limited time</p>
          <div className="flex mt-12 gap-x-12">
            <PricingComponent plan_name="Basic" price="5" original_price="12" discount_percent="58" period="month" access_list={["Generate upto 1000 Quiz/Flashcard per Month", "Export Quiz and Flashcard", "Editing and Managing", "Email Support"]} />
            <PricingComponent plan_name="Pro" price="15" original_price="24" discount_percent="37" period="month" access_list={["All Basic Feature", "In-built Spaced Repetition", "Advanced Stats and Insights", "Priority Customer Support"]} />
          </div>
        </section>

        <section id="faqs" className="container flex flex-col items-center">
          <h2 className="text-4xl font-bold mt-20 tracking-tighter">FAQs</h2>
          <div className="mx-8 mt-8 flex flex-col items-start">
            <FaqComponent ques="What is the purpose of this app?" ans="This app helps students generate AI-driven quizzes and flashcards, making studying more efficient and effective. It also supports exporting content to popular spaced repetition software." />
            <hr />
            <FaqComponent ques="How does the AI generate questions and flashcards?" ans="The AI analyzes the provided study material to create relevant questions and answers, ensuring comprehensive coverage of key concepts." />
            <hr />
            <FaqComponent ques="Can I customize the generated quizzes and flashcards?" ans="Yes, you can review and edit the generated content to fit your specific study needs and preferences." />
            <hr />
            <FaqComponent ques="How do I export the generated content to my spaced repetition software?" ans="The app supports exporting to various formats compatible with popular spaced repetition tools like Anki and Quizlet. Simply choose your preferred format and download." />
            <hr />
            <FaqComponent ques="Is there an inbuilt spaced repetition feature?" ans="Yes, the app includes an inbuilt spaced repetition feature, allowing you to study directly within the platform without needing additional software." />
            <hr />
            <FaqComponent ques="Is there a free trial available?" ans="Yes, we offer a free trial period so you can explore the app's features and see how it can benefit your studies before committing to a subscription." />
          </div>
        </section>

        <section id="cta" className="container flex flex-col items-center ">
          <h2 className="text-4xl font-bold mt-20">Start Learning Today</h2>
          <p className="text-base text-gray-700 mt-4">Sign up today to start a more efficient and successful learning journey,</p>
          <p className="text-base text-gray-700"> and leave behind the frustration of disappointing results.</p>
          <Link href={""} className="mt-8 px-4 py-2 bg-cyan-500 rounded-full text-white">Start Free Trial</Link>
        </section>

      </main>

      <hr className="container mx-auto mt-8" />

      <footer>
        <div className="container grid grid-cols-1 md:grid-cols-2 items-center content-start mx-auto mt-12">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-bold">FlashQuizzr</h2>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M 6 3 C 4.3550302 3 3 4.3550302 3 6 L 3 18 C 3 19.64497 4.3550302 21 6 21 L 18 21 C 19.64497 21 21 19.64497 21 18 L 21 6 C 21 4.3550302 19.64497 3 18 3 L 6 3 z M 12 7 L 14 7 C 14 8.005 15.471 9 16 9 L 16 11 C 15.395 11 14.668 10.734156 14 10.285156 L 14 14 C 14 15.654 12.654 17 11 17 C 9.346 17 8 15.654 8 14 C 8 12.346 9.346 11 11 11 L 11 13 C 10.448 13 10 13.449 10 14 C 10 14.551 10.448 15 11 15 C 11.552 15 12 14.551 12 14 L 12 7 z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M10.053,7.988l5.631,8.024h-1.497L8.566,7.988H10.053z M21,7v10	c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V7c0-2.209,1.791-4,4-4h10C19.209,3,21,4.791,21,7z M17.538,17l-4.186-5.99L16.774,7	h-1.311l-2.704,3.16L10.552,7H6.702l3.941,5.633L6.906,17h1.333l3.001-3.516L13.698,17H17.538z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,14.598V9.402c0-0.385,0.417-0.625,0.75-0.433l4.5,2.598c0.333,0.192,0.333,0.674,0,0.866l-4.5,2.598 C10.417,15.224,10,14.983,10,14.598z"></path>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-12 items-start">
            <div className="flex flex-col">
              <span className="text-lg font-semibold">About</span>
              <Link href={""}><span className="text-sm text-gray-600">About Us</span></Link>
              <Link href={""}><span className="text-sm text-gray-600">Our Team</span></Link>
              <Link href={""}><span className="text-sm text-gray-600">Blog</span></Link>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Product</span>
              <Link href={""}><span className="text-sm text-gray-600">Features</span></Link>
              <Link href={"/#pricing"}><span className="text-sm text-gray-600">Pricing</span></Link>
              <Link href={"/#demo"}><span className="text-sm text-gray-600">Demo</span></Link>
              <Link href={"/#faqs"}><span className="text-sm text-gray-600">FAQs</span></Link>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Support</span>
              <Link href={""}><span className="text-sm text-gray-600">Help Center</span></Link>
              <Link href={""}><span className="text-sm text-gray-600">Contact Us</span></Link>
              <Link href={""}><span className="text-sm text-gray-600">Community</span></Link>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Legal</span>
              <Link href={""}><span className="text-sm text-gray-600">Privacy Policy</span></Link>
              <Link href={""}><span className="text-sm text-gray-600">Terms of Service</span></Link>
              <Link href={""}><span className="text-sm text-gray-600">Cookies</span></Link>
              <Link href={""}><span className="text-sm text-gray-600">Security</span></Link>
            </div>
          </div>
        </div>
        <hr className="container mx-auto my-4" />
        <div className="container flex flex-wrap items-center justify-between mx-auto mb-8">
          <span className="text-sm">&#169; 2024 FlashQuizzr</span>
          <span className="text-sm">All right reserved. <a className="text-sm text-cyan-500 font-semibold">Privacy Policy</a><span className="font-semibold text-cyan-500"> &#9679; </span><a className="text-sm text-cyan-500 font-semibold">Terms of Service</a></span>
        </div>
      </footer>
    </>
  );
}
