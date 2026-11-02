import servise from "../services/asistents.js"
class Asistents{
    constructor(){}

   async getAsistents(req,res){
        let resData = await servise.allAsistents()

        return res.status(resData.status).json({
            status:200,
            data:resData.data
        })
    }

    async thi_asistant(req,res){
        let id=req.params.id
        let resdata=await servise.this_asistant(id)
        return res.status(200).json({
            status:resdata.status,
            data:resdata.data
        })
    }
    async addAssistant(req,res){
        let resData=await servise.addAssistant(req,res)

        return res.status(resData.status).json({
            status:resData.status
            ,message:resData.message
        })
    }
    async delete(req,res){
        let id=req.params.id
        let resData=await servise.delete(id)
        return res.status(resData.status).json({
            status:200,
            message:resData.message
        })
    }
    async editInfo(req,res){
        let resData = await servise.editInfo(req)
        return res.status(resData.status).json({
            status:resData.status,
            message:resData.message
        })
    }
}

let asistents=new Asistents

export default asistents