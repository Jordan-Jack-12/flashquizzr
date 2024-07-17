export default function BlogPage() {
  return (
    <>
      <header>
        <div className="w-screen my-4 flex items-center justify-around">
          <div>FlashQuizzr</div>
          <nav>
            <ul className="flex justify-around items-center gap-x-4">
              <li>Sigin</li>
              <li><a><button className="py-2 px-6 text-white bg-cyan-600 rounded-full">Signup</button></a></li>
            </ul>
          </nav>
        </div>
      </header>

    </>
  )
}
