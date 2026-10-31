import servises from "../services/login.js"
import { acsesToken, refreshToken } from "../utils/jwt.js"
class Login{

    constructor(){}

    async Loginn(req,res){
      await servises.loginn(req,res)
   }
}


let login=new Login()

export default login