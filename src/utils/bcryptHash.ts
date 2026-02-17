import bcrypt from "bcryptjs";

export const bcryptHash = async (password: string) => {
    try {
        const hashedPassword: string =await bcrypt.hash(password, 10)
        return hashedPassword
    } catch (error) {
        throw new Error("hashing gone wrong")
    }
}