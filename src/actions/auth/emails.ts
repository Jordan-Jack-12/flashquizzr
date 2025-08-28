import { RESEND_API_KEY } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { generateVerifyToken, tokenExpired } from "@/utils/auth/stringGenerator";
import { redirect } from "next/navigation";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);

export async function sendVerificationEmail({ email, firstName, token }: { email: string, firstName: string, token: string }) {
    try {
        const { error } = await resend.emails.send({
            from: 'Flashquizzr <mail@mail.flashquizzr.com>',
            to: email,
            subject: 'Verify Your Email',
            html: `Welcome ${firstName}, Click here to verify <a href='http://localhost:3000/api/email-verify?token=${token}'> Verify me</a>`,

        });

        if (error) {
            console.log(error)
            return { error: true, message: error.message }}

        return { error: false, message: "Successfully sent email." }

    } catch (error) {
        console.log(error, "error 333")
        return { error: true, message: "Something went wrong" }
    }

}

export async function verifyEmail(token: string) {
    try {
        const expiredToken = tokenExpired(token);

        if (expiredToken === true) return redirect(`/resend-verification?token=${token}&expiredtoken=true`);

        const profile = await prisma.profile.findFirst({
            where: { emailVerificationToken : token },
            select: {id: true}
        })

        if (!profile) return redirect(`/resend-verification?token=${token}&profile=false`);

        const verifiedProfile = await prisma.profile.update({
            where: {id: profile.id},
            data: {
                emailVerificationToken: null,
                emailVerifiedAt: new Date(),
            },
            select: {id: true}
        })

        if (!verifiedProfile) return {success: false, message: "Verification failed"}

        return { success: true, message: "Email verified!" };

    } catch (err) {
        console.log(err)
        return redirect(`/resend-verification?token=${token}&somethingwent=false`);
    }
}

export async function resendEmailVerification(formData:FormData) {
        "use server"
        const token = formData.get('token')?.toString();

        if (!token) return;

        const profile = await prisma.profile.findFirst({
            where: { emailVerificationToken: token },
            select: {
                id: true,
                firstName: true,
                email: true,
            }
        })

        if (!profile) return;

        const newToken = await generateVerifyToken();

        await prisma.profile.update({
            where: {id: profile.id},
            data: {
                emailVerificationToken: newToken
            }
        })
        
        sendVerificationEmail({firstName: profile.firstName, email: profile.email, token: newToken})
    }