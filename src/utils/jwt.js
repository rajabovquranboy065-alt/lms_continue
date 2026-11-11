import JWT from "jsonwebtoken"
import { configDotenv } from "dotenv"
configDotenv()


export let acsesToken = (payload) => {
    return JWT.sign(payload,process.env.secret_key,{expiresIn:"24h"})
}

export let refreshToken = (payload) =>{
    return JWT.sign(payload,process.env.secret_key,{expiresIn:"24h"})
}

export let chekToken=(token)=>{
    return JWT.verify(token,process.env.secret_key)
}