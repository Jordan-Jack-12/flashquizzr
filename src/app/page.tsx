import Image from "next/image";

export default function Home() {
  return (
    <>
      <header>
        <div className="w-screen h-10 flex items-center justify-around">
          <div>FlashQuizzr</div>
          <nav>
            <ul className="flex justify-around gap-x-4">
              <li>Feature</li>
              <li>Pricing</li>
              <li>Sigin</li>
              <li>Signup</li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-start px-24">

        <section id="hero"></section>
        <section id="feature"></section>
        <section id="pricing"></section>
      </main>
      <footer>
        <div>

        </div>
      </footer>
    </>
  );
}
