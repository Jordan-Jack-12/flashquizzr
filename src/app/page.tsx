import Image from "next/image";

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
        <section id="feature" className="w-screen h-[80vh] bg-[rgb(189,240,255)] bg-[radial-gradient(circle, rgba(189,240,255,1) 0%, rgba(234,255,213,1) 100%)]"></section>
        <section id="testemonial" className="w-1/2 h-8 bg-green-400"></section>
        <section id="pricing" className="w-1/2 h-20 bg-blue-300"></section>
        <section id="cta" className="w-1/2 h-10 bg-yellow-300"></section>

      </main>
      <footer>
        <div>

        </div>
      </footer>
    </>
  );
}
