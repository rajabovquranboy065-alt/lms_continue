import service from "../services/mentors.js"
class Mentors{
    constructor(){}
    
     async getAllMentors(req,res){
        let resData=await service.getAllMentors()

        return res.status(resData.status).json({
            status:resData.status,
            data:resData.data
        })
     }

     async addMentor(req,res){
        let resData = await service.addMentor(req,res)
        return res.status(resData.status).json({
            status:resData.status,
            message:resData.message
        })
     }
     async deleteMentor(req,res){
        let resData=await service.deleteMentor(req)
        return res.status(resData.status).json({
            status:resData.status,
            message:resData.message
        })
     }
     async getTHIS_Mentor(req,res){
        let resData= await service.getTHIS_Mentor(req)
        return res.status(resData.status).json({
            status:resData.status,
            data:resData.data
        })
     }

     async editMentor(req,res){
        let resData=await service.editMentor(req)

        return res.status(resData.status).json({
            status:resData.status,
            message:resData.message
        })
     }


}


let mentors=new Mentors()

export default mentors