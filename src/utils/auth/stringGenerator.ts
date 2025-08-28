import crypto from "crypto";

export function generateSalt() {
    return crypto.randomBytes(16).toString("hex").normalize()
}

export async function generateVerifyToken() {
    return crypto.randomBytes(32).toString('hex') + "." + (Date.now() + 24 * 60 * 60 * 1000);
}

export function tokenExpired(token: string) {
        const [tokenString, date] = token.split('.')
        console.log(Date.now() < Number(date) || tokenString.length < 1 , "time comapring", date, Date.now())
        if (Date.now() > Number(date) || tokenString.length < 1) return true
        return false;
}

export function hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
            if (error) reject(error)

            resolve(hash.toString("hex").normalize())
        })
    })
}

export async function comparePasswords({
    password,
    salt,
    hashedPassword,
}: {
    password: string
    salt: string
    hashedPassword: string
}) {
    const inputHashedPassword = await hashPassword(password, salt)

    return crypto.timingSafeEqual(
        Buffer.from(inputHashedPassword, "hex"),
        Buffer.from(hashedPassword, "hex")
    )
}