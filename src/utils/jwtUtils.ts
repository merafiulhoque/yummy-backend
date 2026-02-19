import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../const/const.js";
import { JWT_PAYLOAD, JWT_SIGN_INPUT } from "../type/types.js";

export function jwtSign(payload: JWT_SIGN_INPUT){
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: "1h"
    })

    return token
}

export function jwtVerify(token: string): JWT_PAYLOAD | null{
    try {
        const decode = jwt.verify(token, JWT_SECRET_KEY)

        if(typeof decode === "string"){
            return null
        }

        return decode as JWT_PAYLOAD
    } catch (error) {
        return null
    }
}

// export function isTokenValid(token: string): boolean{
//     try {
//         const decode = jwt.verify(token, JWT_SECRET_KEY)

//         if(typeof decode === "string"){
//             return false
//         }

//         return true
//     } catch (error) {
//         return false
//     }
// }

