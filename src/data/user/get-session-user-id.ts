import { redisClient, Session } from "@/redis/redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = process.env.SESSION_COOKIE_NAME || "sid";

export async function getSessionUserID() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE)?.value;

    if (!sessionId || sessionId.length < 1) redirect("/login");

    const session = await redisClient.get<Session>(`session:${sessionId}`);

    if (!session) redirect('/login');

    return session.userId;
}