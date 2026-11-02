
import { hash } from "argon2"
import pool from "../config/db.js"


class ServiseAsistents{

    async allAsistents(req,res){
        let mentors=await pool.query(`select * from assistants`)
        return{
            status:200,
            data:mentors.rows
        }
    }

    async this_asistant(id){
        let asis=await pool.query(`select * from assistants where id=$1`,[id])
        if(!asis.rows.length){
            return {
               status:400,
               data:"this assistants not found"

            }
        }
        return{
            status:200,
            data:asis.rows
        }
    }

    async addAssistant(req,res){
        try {
            let {fullname, password, cousr_id,phone}=req.body
            let user=await pool.query(`select * from assistants where phone=$1`,[phone])
            let hashPassword=await hash(password)

            if(user.rows.length){
                return {
                    status:400,
                    message:"this number is alredy has"
                }
            }

            await pool.query(`insert into assistants(fullname,password,course_id,phone) values($1,$2,$3,$4)`,
                [fullname,hashPassword,cousr_id,phone])
                return {
                    status:200,
                    message:"assistant added!"
                }
                
            }
             catch (error) {
                return {
                   status: 500,
                   message: error.message
               }
        }

    }
    async delete(id){
        let user=await pool.query("select * from assistants where id=$1",[id])
        if(!user.rows.length){
            return {
                status:400,
                message:"user not found"
            }
        }
        await pool.query(`update assistants set status='inactive' where id=$1`,[id])
        return {
            status:200,
            message:"user inactived!"
        }

    }
    async editInfo(req){
        let id=req.params.id
        let {fullname,phone,password,course_id,}=req.body

        let user=await pool.query(`select * from assistants where id=$1`,[id])
        if(!user.rows.length){
            return {
                status:400,
                message:"user not found"
            }
        }
        let hashPassword=password?await hash(password):null

        let key="fullname=coalesce($1,fullname),phone=coalesce($2,phone),password=coalesce($3,password),course_id=coalesce($4,course_id)"
        let value=[fullname || null,
                    phone || null, 
                    hashPassword|| null ,
                    course_id || null,
                    id]
        await pool.query(`update assistants set ${key} where id=$5`, value)
        return {
            status:200,
            message:"this user edited"
        }
    }
}



let asistents=new ServiseAsistents

export default asistents