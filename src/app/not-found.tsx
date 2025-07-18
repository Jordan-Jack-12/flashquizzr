import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-screen h-screen grid grid-cols-1'>
            <div className='place-self-center text-center flex flex-col gap-4'>
                <h2 className='text-4xl font-bold'>Page Not Found</h2>
                <p className='text-stone-400 text-xl'>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
                <Link href="/" className='text-orange-400 font-semibold'>Return Home</Link>
            </div>

        </div>
    )
}