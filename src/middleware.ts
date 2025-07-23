import { NextRequest, NextResponse } from "next/server"
import { getSessionUserID } from "./actions/auth/session/getUserBySessionId";

const privateRoutes = ["/dashboard", "/create", "/edit", "/billing", "/study", "/deck", "/settings", "/quiz", "/stats"]
const authRoutes = ["/login", "/signup"]

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const sessionId = request.cookies.get("session_id")?.value || "";
    
    if (authRoutes.includes(pathname) && (sessionId || sessionId != "")) return NextResponse.redirect(new URL("/dashboard", request.url));

    if (privateRoutes.includes(pathname)) {
        const user = await getSessionUserID(sessionId);
        if (user == null) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
    return NextResponse.next()
}

// add the regex for public files, images and videos