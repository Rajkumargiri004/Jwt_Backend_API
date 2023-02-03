
import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    username:{
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: Number,
        trim: true,
        required: true,

    },
    password: {
        type: String,
        trim: true,
        min: 8,
        required: true,

    },
    cpassword: {
        type: String,
        trim: true,
        min: 8,
        required: true,                 

    },
    token :{
        type : String,
    }

})
export default mongoose.model('userdata',userSchema)