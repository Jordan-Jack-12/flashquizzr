
import { destroySession } from "@/actions/auth/session/session";
import { getSessionUserID } from "@/data/user/get-session-user-id";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const userId = await getSessionUserID();

    try {
        const user = await prisma.profile.findUnique({
            where: { id: userId },
            select: {
                email: true,
                firstName: true,
                lastName: true
            }
        })

        if (!user) {
            destroySession();
            return NextResponse.json({ message: "no user found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}