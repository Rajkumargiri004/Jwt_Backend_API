import Router from 'express'
import userRegister from '../controller/usercontroler.js'
import Loginuser from '../controller/LoginCantroler.js'
import {forgotpasswordcntroler,forgotpassword,newPassword} from '../controller/forgetPassword.js'
const router = Router()

router.post('/register',userRegister)
router.post('/login',Loginuser)

// new password 
router.post("/:id/:token",newPassword)


// forgot password route
router.post('/sendpasswordLink',forgotpasswordcntroler)

// create password route
router.get("/forgotpassword/:id/:token",forgotpassword)

export default router