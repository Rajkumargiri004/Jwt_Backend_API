import userdata from '../model/SignupSchema.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()




const Loginuser = async(req,res)=>{
    const {username , password} = req.body

    if(!username || !password){
        return res.status(400).json ({Mesaage: "plz fill all the credentioal"})
    }

    const existsUser = await userdata.findOne({username});
    
    if(!existsUser){
        return res.status(400).json({Message: "user does not exsist"})
    }

    const ispassword = await bcrypt.compare(password,existsUser.password)

    if(!ispassword){
        return res.status(400).json({message: "invalid credential"})
    }

    const token = jwt.sign({id: existsUser._id},"JwtKey",{expiresIn: "2h"})
    res.cookie("token",token,{
        expiresIn: new Date(Date.now()+10000),
        httpOnly: true,
    })
    res.json({message: "Login sucessessfull........",token})
}
export default Loginuser