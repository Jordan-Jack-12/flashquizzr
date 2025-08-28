'use server';

import { sendVerificationEmail } from "@/actions/auth/emails";
import { AUTH_URL, APIKEY, SESSION_EXPIRATION_SECONDS, COOKIE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { redisClient, Session, sessionKey } from "@/redis/redis";
import { generateVerifyToken } from "@/utils/auth/stringGenerator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
    first_name: z.string({ required_error: 'First name required' }).min(2).trim(),
    last_name: z.string().min(2).trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(8)
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

type FormState = | {
    errors?: {
        first_name?: string[],
        last_name?: string[],
        email?: string[]
        password?: string[]
    }
    message?: string
    error_msg?: string
}
    | undefined

export async function signUp(formState: FormState, formData: FormData) {
    const { error, data } = signUpSchema.safeParse({
        first_name: formData.get('first-name'),
        last_name: formData.get('last-name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (error) {
        return {
            errors: error.flatten().fieldErrors
        }
    }

    const userExist = await prisma.profile.findFirst({
        where: { email: data.email }
    })

    if (userExist) {
        return {
            error_msg: "User already exist."
        }
    }

    const res = await fetch(`${AUTH_URL}/signup`, {
        method: 'POST',
        headers: {
            apiKey: APIKEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        })
    })

    if (!res.ok) return { error_msg: (await res.json()).msg }

    const signUpRes = await res.json();

    const token = await generateVerifyToken()

    const db_res = await prisma.profile.create({
        data: {
            id: signUpRes.user.id,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            emailVerificationToken: token,
        },
        select: {
            email: true
        }
    })

    if (!db_res) return { error_msg: "Something went wrong" }

    const now = Math.floor(Date.now() / 1000);
    const expires_at = now + (signUpRes.expires_in ?? 3600);

    const session_id = crypto.randomUUID();

    const session: Session = {
        userId: signUpRes.user?.id,
        access_token: signUpRes.access_token,
        refresh_token: signUpRes.refresh_token,
        expires_at
    };

    await redisClient.set(sessionKey(session_id), session, { ex: SESSION_EXPIRATION_SECONDS });

    const cookieStore = await cookies()
    cookieStore.set(COOKIE, session_id, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        // ...(COOKIE_DOMAIN ? {domain: COOKIE_DOMAIN } : {} ),
        maxAge: SESSION_EXPIRATION_SECONDS
    });

    await sendVerificationEmail({firstName: data.first_name, email: data.email, token });

    return redirect('/dashboard')
}