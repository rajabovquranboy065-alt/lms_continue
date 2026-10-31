import { chekToken } from "../utils/jwt.js";

export let verifyToken=(req,res,next)=>{
    try {
        let authToken=req.headers.authorization
    
        if(!authToken){
            return res.status(401).json({
                status:401,
                message:"token not found"
            })
        }
        let token = authToken.split(" ")[1]
        if(!token){
            return res.status(401).json({
                status:401,
                message:"token not found or wrong"
            })
        }
        let check=chekToken(token)
        req.user=check

        next()
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
    
}