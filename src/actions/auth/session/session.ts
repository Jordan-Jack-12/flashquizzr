import { redisClient } from '@/redis/redis';
import crypto from 'crypto'
import { cookies } from 'next/headers';

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7

export async function createSession(user: { id: string }) {
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();
    await redisClient.set(`session:${sessionId}`, user, {
        ex: SESSION_EXPIRATION_SECONDS
    });

    (await cookies()).set('session_id', sessionId,
        {
            path: "/",
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        }
    )
}

export async function destroySession() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session_id")?.value

    if (sessionId) {
        await redisClient.del(`session:${sessionId}`)
        cookieStore.delete("session_id")
    }
}