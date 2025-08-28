import { COOKIE } from "@/lib/constants";
import { redisClient, sessionKey } from "@/redis/redis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    const session_id = cookieStore.get(COOKIE)?.value;
    if (session_id) await redisClient.del(sessionKey(session_id));

    const response = NextResponse.json({ok: true})
    response.cookies.set(COOKIE, "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        // ...(COOKIE_DOMAIN ? {domain: COOKIE_DOMAIN} : {}),
        maxAge: 0,
    })

    return response;
}