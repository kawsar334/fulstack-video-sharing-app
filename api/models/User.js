import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        
    },
    img: {
        type: String,
        default:""
    },
    subscribers:{
        type: Number,
        default: 0

    },
    subscribedUsers:{
        type: [String],
        default: []
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    }


},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User ;