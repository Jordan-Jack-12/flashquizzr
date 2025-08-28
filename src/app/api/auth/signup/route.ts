import { APIKEY, AUTH_URL } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {first_name, last_name, email, password, confirm_password} = await request.json();

    if (!first_name || !last_name || !email || !password || !confirm_password ) return NextResponse.json({error: "All fields are required"}, {status: 400});

    if (confirm_password !== password) return NextResponse.json({error: "Password and Confirm Password not matching"}, {status: 400});

    try {
        const userExit = await prisma.profile.findUnique({
        where: {email: email},
        select: {
            email: true,
        }
    })

    if (userExit) return NextResponse.json({error: 'User already exist'}, {status: 409});
    
    console.log(email, password)

    const res = await fetch(`${AUTH_URL}/signup`, {
        method: 'POST',
        headers: {
            apiKey: APIKEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    console.log("supabse issue")
    if (!res.ok) return NextResponse.json({error: (await res.text())}, {status: 500});

    const user = await res.json();

    await prisma.profile.create({
        data: {
            id: user.id,
            email: email,
            firstName: first_name,
            lastName: last_name,
        }
    })
    console.log("this issue")
    return NextResponse.json({message: "User created successfully"}, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Something went wrong'}, {status: 500})
    }

    
}