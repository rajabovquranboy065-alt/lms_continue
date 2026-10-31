import servis from "../services/staff.js"

class Staffcontroller {
    constructor() {}

   async createAdmin(req,res){
        let resdata=await servis.createStaf(req)
        return res.status(resdata.status).json(resdata)

    }

    async getAllAdmins(req,res){
        let resdata=await servis.getAllAdmins()
        return res.status(resdata.status).json({
            status:resdata.status,
            data:resdata.data
        })
    }

    async deleteAdmin(req,res){
        let resdata=await servis.deleteAdmin(req)
        return res.status(resdata.status).json({
            status:resdata.status,
            message:resdata.message
        })
    }
}

let staffcontroller= new Staffcontroller()


export default staffcontroller
 