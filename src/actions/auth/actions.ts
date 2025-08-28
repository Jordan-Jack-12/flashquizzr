"use server";

import { redirect } from "next/navigation";
import { COOKIE } from "@/lib/constants";
import { redisClient, sessionKey } from "@/redis/redis";
import { cookies } from "next/headers";


export async function logOut() {
    const cookieStore = await cookies();
    const session_id = cookieStore.get(COOKIE)?.value;
    if (session_id) await redisClient.del(sessionKey(session_id));

    cookieStore.set(COOKIE, "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        // ...(COOKIE_DOMAIN ? {domain: COOKIE_DOMAIN} : {}),
        maxAge: 0,
    })
    return redirect('/login');
}