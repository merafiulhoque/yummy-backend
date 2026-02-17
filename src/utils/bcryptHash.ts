import bcrypt from "bcryptjs";

export const bcryptHash = async (password: string) => {
    try {
        const hashedPassword: string =await bcrypt.hash(password, 10)
        return hashedPassword
    } catch (error) {
        throw new Error("hashing gone wrong")
    }
}

export async function bcryptCompare(password: string, dbPass: string) {
    try {
        const isPassOk = await bcrypt.compare(password, dbPass)
        return isPassOk
    } catch (error) {
        throw new Error("password matching gone wrong")
    }
}