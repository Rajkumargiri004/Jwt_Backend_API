// send email link for reset password
import bcrypt from 'bcrypt'
import userdata from "../model/SignupSchema.js";

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// 2 create transporter email

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rajkumargiri2312@gmail.com",
    pass: "paddrbzfghkalhsi",
  },
});

// start from here 1
export const forgotpasswordcntroler = async (req, res) => {
  // console.log(req.body)
  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "enter your email" });
  }

  try {
    const userfind = await userdata.findOne({ email: email });
    // console.log("userfind",userfind)

    // token generate for reset password
    const token = jwt.sign({ _id: userfind._id }, "JwtKey", {
      expiresIn: "120s",
    });
    // console.log("token",token)

    const setusertoken = await userdata.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );
    console.log("setusertoken", setusertoken);

    if (setusertoken) {
      const mailoptions = {
        from: "rajkumargiri2312@gmail.com",
        to: email,
        subject: "sending Email for password reset",
        text: `This link valid for 2 minutes http://localhost:3000/Forgotpassword/${userfind.id}/${setusertoken.verifytoken}`,
      };
      transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("email sent", info.response);
          res.status(201)
            .json({ status: 201, message: "email send sucessfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 201, message: "invalid user " });
  }
};

// for creating password

export const forgotpassword = async (req, res) => {
  const { id, token } = req.params;
  // console.log(id,token)
  try {
    const validuser = await userdata.findOne({ _id: id, verifytoken: token });
    // console.log(validuser)

    // for verify token

    const verifytoken = jwt.verify(token, "JwtKey");

    console.log(verifytoken);

    // if user is valid and its verify then we get id
    if (validuser && verifytoken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exsist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

// For New Password

export const newPassword = async(req,res)=>{
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const validuser = await userdata.findOne({_id:id,verifytoken:token });

    const verifytoken = jwt.verify(token,JwtKey);

    if (validuser && verifytoken._id) {
      const newpsswrd = await bcrypt.hash(password, 12);

      const setnewuserpass = await userdata.findByIdAndUpdate(
        {_id: id },
        { password: newpsswrd }
      );
      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exsist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};
