import { verifyEmail } from "@/actions/auth/emails";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    const url = request.url
    const {searchParams} = new URL(url);
    const token = searchParams.get('token') 
    console.log(token, "token hfsdjk")
    console.log(!token)
    if (!token || token.length < 1) return redirect(`/resend-verification?token=${token}&theheck=man`);

    const { success } = await verifyEmail(token);
    console.log(success, "succes or not")
    if (!success) return redirect(`/resend-verification?token=${token}&this=true`);
    revalidatePath('/dashboard', 'layout')
    return redirect('/dashboard')
}