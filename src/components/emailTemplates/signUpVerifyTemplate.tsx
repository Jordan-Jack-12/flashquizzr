import { WEBSITE_URL } from "@/lib/constants";
import Link from "next/link";

type Props = {
    firstName: string,
    token: string
}

export function singUpVerifyTemplate({ firstName, token }: Props) {
    return (
        <div>
            <h1>Welcome, {firstName}!</h1>
            <p>Verify your email</p>
            <Link href={`${WEBSITE_URL}/verify?token=${token}`}>Verify</Link>
        </div>
    );
}