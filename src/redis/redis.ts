import { Redis } from "@upstash/redis";

export const redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export type Session = {
    userId: string,
    access_token: string,
    refresh_token: string,
    expires_at: number,
}

export const sessionKey = (sid: string) => `session:${sid}`;