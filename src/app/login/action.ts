'use server';

import { APIKEY, AUTH_URL, COOKIE, SESSION_EXPIRATION_SECONDS } from "@/lib/constants";
import { redisClient, Session, sessionKey } from "@/redis/redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .trim(),
})

type FormState =
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

export async function logIn(formState: FormState, formData: FormData) {
    const { error, data } = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })
    if (error) {
        return {
            errors: error.flatten().fieldErrors,
        }
    }
    const response = await fetch(`${AUTH_URL}/token?grant_type=password`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            apiKey: APIKEY,
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        
        const error = await response.json();
        return {
            message: error.msg
        }
    }

    const resJSON = await response.json();
    const now = Math.floor(Date.now() / 1000);
    const expires_at = now + (resJSON.expires_in ?? 3600);

    const session_id = crypto.randomUUID();

    const session: Session = {
        userId: resJSON.user?.id,
        access_token: resJSON.access_token,
        refresh_token: resJSON.refresh_token,
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
    return redirect('/dashboard')
}