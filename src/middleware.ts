import { NextRequest, NextResponse } from "next/server"
import { redisClient, Session, sessionKey } from "./redis/redis";
import { isExpired, refreshTokenSupabase } from "./lib/auth";

const COOKIE = process.env.SESSION_COOKIE_NAME || "sid";


const PROTECTED_ROUTES = ["/dashboard", "/create", "/edit", "/billing", "/study", "/deck", "/settings", "/quiz", "/stats"]

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    if (!PROTECTED_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    const session_id = request.cookies.get(COOKIE)?.value;
    if (!session_id) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const session = await redisClient.get<Session>(sessionKey(session_id));
    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    let {access_token, refresh_token, expires_at } = session;

    if (isExpired(expires_at)) {
        const refreshed = await refreshTokenSupabase(refresh_token);
        if (!refreshed) {
            await redisClient.del(sessionKey(session_id));
            return NextResponse.redirect(new URL("/login", request.url));
        }
        access_token = refreshed.access_token;
        refresh_token = refreshed.refresh_token;
        expires_at = refreshed.expires_at;

        await redisClient.set(sessionKey(session_id), {
            ...session,
            access_token,
            refresh_token,
            expires_at,
        })
    }
}

// add the regex for public files, images and videos