import express from "express"
import  { join } from "path"
import { configDotenv } from "dotenv"
configDotenv()
import fileUpload from "express-fileupload"
import main from "./routers/index.js"
let loyiha=express()
loyiha.use(express.json())
loyiha.use(fileUpload())
loyiha.use("/uploads",express.static(join(process.cwd(), 'src', 'utils', 'uploads_introVideo')))


loyiha.use(main)

loyiha.use((error,req,res,next)=>{
    console.log(error,"defwr")
})
loyiha.listen(process.env.port,()=>console.log("server is running"))