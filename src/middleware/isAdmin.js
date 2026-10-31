import { verifyToken } from "./auth.js";

export let isAdmin=(req,res,next)=>{
    try {

        let user= req.user
        if(!user.role || user.role!="Admin"){
            return res.status(400).json({
                status:400,
                message:"sizda bu amalni bajarish huquqi yoq bu adminlar uchun"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message})
    }
}