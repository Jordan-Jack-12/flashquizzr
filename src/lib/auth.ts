import { JWTPayload, jwtVerify } from "jose";
import { JWT_SECRET } from "./constants";

const enc = new TextEncoder()

const ISSUER = process.env.NEXT_PUBLIC_URL + '/auth/v1';
const SUPABASE_AUTH_URL = process.env.NEXT_PUBLIC_SUPABASE_URL + "/auth/v1";
const APIKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export type Tokens = {
    access_token: string,
    refresh_token: string,
    expires_at: number,
    token_type: string,
    user?: unknown,
}

export async function verifyAccessToken(token: string) {
    const { payload } = await jwtVerify(
        token,
        enc.encode(JWT_SECRET),
        {
            issuer: ISSUER
        }
    )

    return payload as JWTPayload & { sub: string, email?: string }
}

export function isExpired(time: number, skew = 15) {
    return Date.now() > (time - skew)
}

export async function refreshTokenSupabase(refresh_token: string) {
    const response = await fetch(SUPABASE_AUTH_URL + '/token?grant_type=refresh_token', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            apiKey: APIKEY,
        },
        body: JSON.stringify({
            grant_type: "refresh_token",
            refresh_token,
        })
    });

    if (!response.ok) return null;

    const data = await response.json();

    const now = Math.floor(Date.now() / 1000);
    const expires_at = now + (data.expires_in ?? 3600);
    const tokens: Tokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token ?? refresh_token,
        expires_at,
        token_type: data.token_type,
        user: data.user
    }

    return tokens
}