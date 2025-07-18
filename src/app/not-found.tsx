import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-screen h-screen grid grid-cols-1'>
            <div className='place-self-center text-center'>
                <h2 className='text-3xl font-bold'>Not Found</h2>
                <p className='text-stone-400'>Could not find requested page</p>
                <Link href="/" className='text-orange-400 font-semibold'>Return Home</Link>
            </div>

        </div>
    )
}