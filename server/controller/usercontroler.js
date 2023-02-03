import userdata from "../model/SignupSchema.js";
import bcrypt from 'bcrypt'

const userRegister = async (req, res) => {
  const { username, email, password, phone, cpassword,} = req.body;

  // validation

  if (!email || !username || !password || !cpassword || !phone) {
    res.status(400);
    throw new Error("please fill in all details");
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error("password must be up to 8 character");
  }
  if(password !== cpassword){
    res.status(400)
    throw new Error("password does not match")
  }
  
  if(phone.length !==10){
    res.status(400)
    throw new Error ("phone no is not valid")
  }

  // hashedpassword
  const hashpassword = await bcrypt.hash(password,12)

  // check if user email already exists
  const existsUser = await userdata.findOne({ email });
  if (existsUser) {
    res.status(400);
    throw new Error("email has been already registred");
  }

 
  
  // create  user and save in mongodb
  
  const user = await userdata.create({username,email,password: hashpassword,cpassword: hashpassword,phone,})
  user.save()
    res.status(200).json({message: "user register sucessfully"})
  
  
};
export default userRegister;
