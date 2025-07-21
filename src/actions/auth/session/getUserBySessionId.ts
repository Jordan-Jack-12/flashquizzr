import { redisClient } from '@/redis/redis'

export async function getSessionUserID(sessionId: string): Promise<string | null> {
    if (!sessionId) return null

    const session = await redisClient.get<{id: string}>(`session:${sessionId}`)
    if(!session) return null

    return session.id
}