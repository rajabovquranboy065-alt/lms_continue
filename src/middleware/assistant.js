import { creatAsistSchema } from "../utils/validation.js"
export let AsistMiddleware=(req,res,next)=>{
    let obj=req.body
    let {error}=creatAsistSchema.validate(obj)
    
    if(error){
        return res.status(400).json({
            status:400,
            message:error.message
        })
    }
    next()
}