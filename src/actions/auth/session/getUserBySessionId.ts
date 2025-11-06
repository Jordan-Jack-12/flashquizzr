import { redisClient } from '@/redis/redis'

export async function getSessionUserID(sessionId: string): Promise<string | null> {
    if (!sessionId) return null

    const session = await redisClient.get<{userId: string}>(`session:${sessionId}`)
    if(!session) return null
    // console.log(session, "this is from redis")
    return session.userId
}