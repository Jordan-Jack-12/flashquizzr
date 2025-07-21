"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { comparePasswords, generateSalt, generateVerifyToken, hashPassword } from "./stringGenerator";
import { createSession, destroySession } from "./session/session";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function signUp(formData: FormData) {
    const firstName = formData.get("first-name")?.toString();
    const lastName = formData.get("last-name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirm-password")?.toString();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        redirect("/signup?error=104");
    }

    const existEmail = await prisma.user.findUnique({
        where: { email: email },
        select: { email: true }
    });

    if (existEmail) {
        redirect("/signup?error=E01");
    }

    const salt = generateSalt();

    const hashedPassword = await hashPassword(password, salt);

    const verifyToken = generateVerifyToken();

    const newUser = await prisma.user.create({
        data: {
            email: email,
            passwordHash: hashedPassword,
            salt: salt,
            firstName: firstName,
            LastName: lastName,
            verifyToken: verifyToken,
            verifyTokenExpires: new Date(Date.now() + 60 * 60 * 1000)
        }
    })

    const { error } = await resend.emails.send({
        from: 'Flashquizzr <mail@mail.flashquizzr.com>',
        to: email,
        subject: 'Verify Your Email',
        html: `<div> <h2>Verify Email</h2> <a href='https://flashquizzr.com/verify?token=${verifyToken}'>verify email </div>`,
    });

    if (error) {
        redirect("/signup?error=E04")
    }

    await createSession({id: newUser.id})

    redirect("/dashboard");
}

export async function resendVerificationEmail(formData: FormData) {
    const userId = formData.get('user-id')?.toString;

    if (userId != undefined) {
        return;
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            email: true
        }
    })

    if (!user) return;

    const { error } = await resend.emails.send({
        from: 'Flashquizzr <mail@flashquizzr.com>',
        to: user.email,
        subject: 'Verify Your Email',
        html: `<div> <h2>Verify Email</h2> <a href='https://flashquizzr.com/verify?token=${generateVerifyToken()}'>verify email </div>`,
    });

    if (error) {
        redirect("/resend-verification?error=E04")
    }
}

export async function logIn(formData:FormData) {
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString();

    if (!email || !password) {
        redirect("/login?error=E05");
    }

    const user = await prisma.user.findUnique({
        where: {email: email},
        select: {
            id: true,
            email: true,
            passwordHash: true,
            salt: true
        }
    })

    if (!user || user == null) {
        redirect("/login?error=E06")
    }

    const isCorrectPassword = await comparePasswords({password: password, hashedPassword: user.passwordHash, salt: user.salt})

    if (!isCorrectPassword) {
        redirect("/login?error=E06");
    }

    await createSession({id: user.id})
    redirect("/dashboard");
}

export async function logOut() {
    await destroySession();
    redirect("/login");
}