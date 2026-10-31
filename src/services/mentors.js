import pool from "../config/db.js"
import { hash } from "argon2"
class Mentors{
    constructor(){}

    async getAllMentors(){
        let res=await pool.query(`SELECT id, fullname, phone, role, status, created_at FROM mentors`)
        res=res.rows
        return{
            status:200,
            data:res
        }
    }

    async addMentor(req,res){
        try {
            const {
             fullname,
             phone,
             password,
             role,
             experience,
             profession,
             website,
             bio,
             social_facebook,
             social_telegram,
             social_linkedin,
             social_instagram,
             social_github
         }   = req.body;
     
         let hashedPassword=await hash(password)
     
         const newMentor = await pool.query(
         `INSERT INTO mentors (
             fullname, 
             phone, 
             password, 
             role,
             experience, 
             profession, 
             website, 
             bio, 
             social_facebook, 
             social_telegram, 
             social_linkedin, 
             social_instagram, 
             social_github
         ) 
         VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, $12, $13)
         RETURNING *;`,
         [
             fullname,
             phone,
             hashedPassword,
             role,
             experience,
             profession,
             website,
             bio,
             social_facebook,
             social_telegram,
             social_linkedin,
             social_instagram,
             social_github
         ]
     );    
          return {
             status:200,
             message:"Mentor added"
          }
            

        } catch (error) {
            if(error.code=="23505"){
                return{
                    status:400,
                    message:"this number is alredy has"
                }
            }
        }
    }

    async deleteMentor(req){
        let mentorId=req.params.id
       let user= await pool.query(`select * from mentors where id=$1`,[mentorId])
       user=user.rows
       if(!user.length){
        return{
            status:400,
            message:'not found this id user'
        }
       }
       else{
            await pool.query(`Update mentors set status='Inactive' where id=$1`,[mentorId])
            return{
                status:200,
                message:`mentor deleted`
            }
       }
    }

    async getTHIS_Mentor(req){
        let mentorId=req.params.mentorId
        let mentor=await pool.query(`select phone, fullname,image,profession,role,created_at,
            experience,social_facebook,
            social_telegram
            social_linkedin ,
            social_instagram,
            social_github
            from mentors where id=$1`,[mentorId])
        mentor=mentor.rows
        if(!mentor.length){
            return {
                status:400,
                message:'mentor is not found'
            }
        }
        return{
            status:200,
            data:mentor
        }
    }
    async editMentor(req){


        let mentorId=req.params.mentorId
        let mentor = await pool.query(`select * from mentors where id=$1`,[mentorId])
        mentor=mentor.rows
        if(!mentor.length){
            return {
                status:400,
                message:"this mentor not found"
            }
        }


        const {
             fullname,
             phone,
             password,
             role,
             experience,
             profession,
             website,
             bio,
             social_facebook,
             social_telegram,
             social_linkedin,
             social_instagram,
             social_github
         }   = req.body;


            let hashedPassword=password?await hash(password):null


         const query = `
        UPDATE mentors 
        SET 
            fullname = COALESCE($1, fullname),
            phone = COALESCE($2, phone),
            password = COALESCE($3, password),
            role = COALESCE($4, role),
            experience = COALESCE($5, experience),
            profession = COALESCE($6, profession),
            website = COALESCE($7, website),
            bio = COALESCE($8, bio),
            social_facebook = COALESCE($9, social_facebook),
            social_telegram = COALESCE($10, social_telegram),
            social_linkedin = COALESCE($11, social_linkedin),
            social_instagram = COALESCE($12, social_instagram),
            social_github = COALESCE($13, social_github)
        WHERE id = $14 
        RETURNING *;`;

    const values = [
            fullname || null,
            phone || null,
            hashedPassword,
            role || null,
            experience || null,
            profession || null,
            website || null,
            bio || null,
            social_facebook || null,
            social_telegram || null,
            social_linkedin || null,
            social_instagram || null,
            social_github || null,
            mentorId // $14 uchun
        ];

            await pool.query(query,values)

            return {
                status:200,
                message:"Mentor successfully updated"
            }
    }
}

let mentors=new Mentors()


export default mentors