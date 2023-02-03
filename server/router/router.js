import Router from 'express'
import userRegister from '../controller/usercontroler.js'
import Loginuser from '../controller/LoginCantroler.js'
// import forgotpasswordcntroler from '../controller/forgetPassword'
const router = Router()

router.post('/register',userRegister)
router.post('/login',Loginuser)


// forgot password api
// router.post('/forgotpassword',forgotpasswordcntroler)

// export default router