import express from "express"
import { configDotenv } from "dotenv"
configDotenv()
import main from "./routers/index.js"
let loyiha=express()
loyiha.use(express.json())
loyiha.use(main)


loyiha.use((error,req,res,next)=>{
    console.log(error,"defwr")
})
loyiha.listen(process.env.port,()=>console.log("server is running"))