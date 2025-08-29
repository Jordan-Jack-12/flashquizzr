import Link from 'next/link'
import Image from 'next/image'
import { getSessionUserIDNavBar } from '@/data/user/get-session-user-id';

async function TopNavBar() {

    const userID = await getSessionUserIDNavBar();

    return (
        <header className="w-screen container mx-auto">
            <div className="fixed top-0 right-0 left-0 z-50 bg-stone-900/80 container py-4 flex items-center justify-between font-bold mx-auto px-5 backdrop-blur-md">
                <Link href={'/'} className="flex gap-2">
                    <Image src={"/flashquizzrlogo.svg"} height={32} width={32} alt="flashquizzrlogo" />
                    <h1 className="text-2xl font-bold">FlashQuizzr</h1>
                </Link>
                <nav>
                    <ul className="hidden md:flex justify-around items-center gap-x-4">

                        <li><Link href={"/#feature"}>Feature</Link></li>
                        <li><Link href={"/#pricing"}>Pricing</Link></li>
                        <li><Link href={"/blog"}>Blog</Link></li>
                        {!userID && <>
                            <li><Link href={"/login"}>Login</Link></li>
                            <li><Link href={"/signup"}><button className={`py-2 px-6 text-orange-950 rounded-md button_gradient cursor-pointer`}>Signup</button></Link></li>
                        </>}
                        {userID && <li><Link href={"/dashboard"}><button className={`py-2 px-6 text-orange-950 rounded-md button_gradient cursor-pointer`}>Dashboard</button></Link></li>}

                    </ul>
                </nav>
            </div>
            <div className='h-18'></div>
        </header>
    )
}

export default TopNavBar