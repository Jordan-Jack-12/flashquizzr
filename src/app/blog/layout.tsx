import Link from "next/link"
import Image from "next/image"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <header className="w-screen container">
                <div className="fixed top-0 right-0 left-0 z-50 bg-black/80 container py-4 flex items-center justify-between font-bold mx-auto px-5 backdrop-blur-md">
                    <Link href={'/'} className="flex gap-2">
                        <Image src={"/flashquizzrlogo.svg"} height={32} width={32} alt="flashquizzrlogo" />
                        <h1 className="text-2xl font-bold">FlashQuizzr</h1>
                    </Link>
                    <nav>
                        <ul className="hidden md:flex justify-around items-center gap-x-4">

                            <li><Link href={"/#feature"}>Feature</Link></li>
                            <li><Link href={"/#pricing"}>Pricing</Link></li>
                            <li><Link href={"/login"}>Login</Link></li>

                            <li><Link href={"/signup"}><button className={`py-2 px-6 text-white rounded-md button_gradient`}>Signup</button></Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="h-18"></div>
            </header>
            {children}
            <footer className="w-screen container mx-auto">
                <div className="container border-t-1 border-stone-900 grid grid-cols-1 lg:grid-cols-2 items-center content-start mx-auto mt-12 px-5">
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-2">
                            <Image src={"/flashquizzrlogo.svg"} height={18} width={18} alt="flashquizzrlogo" />
                            <h2 className="text-lg font-bold text-center md:text-left">FlashQuizzr</h2>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                                <path d="M 6 3 C 4.3550302 3 3 4.3550302 3 6 L 3 18 C 3 19.64497 4.3550302 21 6 21 L 18 21 C 19.64497 21 21 19.64497 21 18 L 21 6 C 21 4.3550302 19.64497 3 18 3 L 6 3 z M 12 7 L 14 7 C 14 8.005 15.471 9 16 9 L 16 11 C 15.395 11 14.668 10.734156 14 10.285156 L 14 14 C 14 15.654 12.654 17 11 17 C 9.346 17 8 15.654 8 14 C 8 12.346 9.346 11 11 11 L 11 13 C 10.448 13 10 13.449 10 14 C 10 14.551 10.448 15 11 15 C 11.552 15 12 14.551 12 14 L 12 7 z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                                <path d="M10.053,7.988l5.631,8.024h-1.497L8.566,7.988H10.053z M21,7v10	c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V7c0-2.209,1.791-4,4-4h10C19.209,3,21,4.791,21,7z M17.538,17l-4.186-5.99L16.774,7	h-1.311l-2.704,3.16L10.552,7H6.702l3.941,5.633L6.906,17h1.333l3.001-3.516L13.698,17H17.538z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-stone-900 dark:fill-stone-50" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                                <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,14.598V9.402c0-0.385,0.417-0.625,0.75-0.433l4.5,2.598c0.333,0.192,0.333,0.674,0,0.866l-4.5,2.598 C10.417,15.224,10,14.983,10,14.598z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="grid  gap-x-12 g-y-4 mt-4 grid-cols-2 lg:grid-cols-4 lg:gap-x-12 items-start">
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold">About</span>
                            <Link href={"/about"}><span className="text-sm text-stone-600 dark:text-stone-500">About Us</span></Link>
                            <Link href={"/team"}><span className="text-sm text-stone-600 dark:text-stone-500">Our Team</span></Link>
                            <Link href={"/blog"}><span className="text-sm text-stone-600 dark:text-stone-500">Blog</span></Link>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold">Product</span>
                            <Link href={"/#feature"}><span className="text-sm text-stone-600 dark:text-stone-500">Features</span></Link>
                            <Link href={"/#pricing"}><span className="text-sm text-stone-600 dark:text-stone-500">Pricing</span></Link>
                            <Link href={"/#demo"}><span className="text-sm text-stone-600 dark:text-stone-500">Demo</span></Link>
                            <Link href={"/#faqs"}><span className="text-sm text-stone-600 dark:text-stone-500">FAQs</span></Link>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold">Support</span>
                            <Link href={"/help"}><span className="text-sm text-stone-600 dark:text-stone-500">Help Center</span></Link>
                            <Link href={"/contact"}><span className="text-sm text-stone-600 dark:text-stone-500">Contact Us</span></Link>
                            <Link href={"/community"}><span className="text-sm text-stone-600 dark:text-stone-500">Community</span></Link>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold">Legal</span>
                            <Link href={"/privacy-policy"}><span className="text-sm text-stone-600 dark:text-stone-500">Privacy Policy</span></Link>
                            <Link href={"/terms-of-service"}><span className="text-sm text-stone-600 dark:text-stone-500">Terms of Service</span></Link>
                            <Link href={"/cookie-policy"}><span className="text-sm text-stone-600 dark:text-stone-500">Cookies</span></Link>
                            <Link href={"/security"}><span className="text-sm text-stone-600 dark:text-stone-500">Security</span></Link>
                        </div>
                    </div>
                </div>
                <hr className="container mx-auto my-4 px-5 border border-stone-100 dark:border-stone-800" />
                <div className="container lg:container-[100px] flex flex-wrap items-center justify-between mx-auto mb-8 px-5">
                    <span className="text-sm">&#169; 2024 FlashQuizzr</span>
                    <span className="text-sm">All right reserved. <Link href={"/privacy-policy"} className="text-sm text-orange-500 font-semibold">Privacy Policy</Link><span className="font-semibold text-orange-500"> &#9679; </span><Link href={"/terms-of-service"} className="text-sm text-orange-500 font-semibold">Terms of Service</Link></span>
                </div>
            </footer>
        </>
    )
}