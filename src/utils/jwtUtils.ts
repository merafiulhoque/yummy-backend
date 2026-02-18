import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../const/const.js";
import { JWT_SIGN_INPUT } from "../type/types.js";

export function jwtSign(payload: JWT_SIGN_INPUT){
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: "1h"
    })

    return token
}