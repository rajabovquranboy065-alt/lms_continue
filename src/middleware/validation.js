import { ValidationError } from "../utils/error.js"
import {AdminValidationSchema}  from "../utils/validation.js"
import { MentorsValidationSchema } from "../utils/validation.js"

export let AdminMiddleware=(req,res,next)=>{
    let {error}=AdminValidationSchema.validate(req.body)

    if(error){
        return next(new ValidationError(400,error.message))
    }
    next()
}

export let MentorMiddleware=(req,res,next)=>{
    let {error}=MentorsValidationSchema.validate(req.body)

    if(error){
        return res.status(400).json({
            status:400,
            message:error.message
        })
    }
    next()
}