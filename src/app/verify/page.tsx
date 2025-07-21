import { resendVerificationEmail } from "@/actions/auth/actions";
import { prisma } from "@/lib/prisma"

async function VerifyPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {

    const token = (await searchParams).token

    const user = await prisma.user.findFirst({
        where: { verifyToken: token },
    });

    if (!user || !user.verifyTokenExpires || user.verifyTokenExpires < new Date()) {
        return <div className="text-center text-xl mt-5">Token Expired <form action={resendVerificationEmail}><input type="hidden" name="user-id" value={user?.id} /><button className="text-base text-orange-400 font-semibold underline" type="submit">Resend Verification Email</button></form></div>
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            verified: true,
            verifyToken: null,
            verifyTokenExpires: null,
        },
    });

    return (
        <div className="text-xl text-center mt-5">Email Verified <br /> <a className="text-base text-orange-400 font-semibold underline" href="https://flashquizzr.com/login">Login Here</a></div>
    )
}

export default VerifyPage