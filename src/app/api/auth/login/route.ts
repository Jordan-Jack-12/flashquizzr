import { AUTH_URL, APIKEY, SESSION_EXPIRATION_SECONDS, COOKIE } from "@/lib/constants";
import { redisClient, Session, sessionKey } from "@/redis/redis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {email, password } = await request.json();
    console.log(email, password)

    const response = await fetch(`${AUTH_URL}/token?grant_type=password`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            apiKey: APIKEY,
        },
        body: JSON.stringify({
            // grant_type: "password",
            email,
            password,
        })
    })

    if (!response.ok) {
        const error = await response.text();
        return NextResponse.json({error}, {status: 401});
    }

    const data = await response.json();
    const now = Math.floor(Date.now()/1000);
    const expires_at = now + (data.expires_in ?? 3600);

    const session_id = crypto.randomUUID();

    const session: Session = {
        userId: data.user?.id,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at
    };

    await redisClient.set(sessionKey(session_id), session, {ex: SESSION_EXPIRATION_SECONDS});

    const nextRes = NextResponse.json({ok: true});
    nextRes.cookies.set(COOKIE, session_id, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        // ...(COOKIE_DOMAIN ? {domain: COOKIE_DOMAIN } : {} ),
        maxAge: SESSION_EXPIRATION_SECONDS
    });
    return nextRes
}