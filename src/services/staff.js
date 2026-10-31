import pool from "../config/db.js"
import { hash } from "argon2"

class StaffServis{
    constructor(){}

    async createStaf(req){
        try {
            const { fullname ,phone,password,role }=req.body
            let hashPassword=await hash(password)
            await pool.query('insert into staff(fullname,phone,password,role) values($1,$2,$3,$4)',[fullname,phone,hashPassword,role])
            return {
                status:200,
                message:"staff created"
            }
            
        } catch (error) {
            if(error.code=='23505'){
                return {
                    status:400,
                    message:"this numberis alredy has"
                }
            }
        }


    }

    async  getAllAdmins(){
        let alladmins=await pool.query('select id,fullname,phone,role,status,created_at from staff')
        return {
            status:200,
            data:alladmins.rows
        }
    }


    async deleteAdmin(req){
        let deleteUserId=req.params.userId
        let user=await pool.query(`select * from staff where id=$1`,[deleteUserId])

        if(!user.rows.length){
            return {
                status:404,
                message:"this user not found"
            }
        }

        await pool.query(`Update staff set status='inactive' where id=$1`,[deleteUserId])
        return {
            status:200,
            message:"this user inactived"
        }
    }
}
let staffservis= new StaffServis()

export default staffservis