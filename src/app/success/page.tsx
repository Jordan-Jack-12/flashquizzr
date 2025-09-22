import Link from "next/link";


export default function SuccessPage() {
    return <div>Success <Link href={'/'}>Go to Homepage</Link> <Link href={'/dashboard'}>Go to Dashboard</Link></div>
}