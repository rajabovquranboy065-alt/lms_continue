 import { acsesToken, refreshToken } from "../utils/jwt.js"
import pool from "../config/db.js"
import argon from "argon2"
class Login{
    constructor(){}
    async loginn(req,res){
    //    console.log("sdfesdwdsc")
    // console.log(req.body)
        let {phone,password}= req.body

        let this_number=await pool.query(`
             select id , fullname,phone, password ,role from staff where phone=$1
             union 
             select id , fullname,phone, password ,role from mentors where phone=$1 
             union
             select id , fullname,phone, password ,role from students where phone=$1
             `,[phone])

        if(!this_number.rows.length){
                return res.status(400).json({
                    status:400,
                    message:"password or phone is wrong "
                })
            }
        
            let thispassword=this_number.rows[0].password
            let checkPassword=await argon.verify(thispassword,password)

            if(!checkPassword){
                return res.status(400).json({
                    status:400,
                    message:"password or phone is wrong"
                })
            }
            let payload={
                id:this_number.rows[0].id,
                fullname:this_number.rows[0].fullname,
                role:this_number.rows[0].role
            }

        let acses_Token=acsesToken(payload)
        let refresh_Token=refreshToken(payload)
        return res.status(200).json({
            status:200,
            acses_Token,
            refresh_Token,
            role:this_number.rows[0].role

        })
    }

}
let login=new Login()
export default login