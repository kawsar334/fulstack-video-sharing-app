import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    views:{
        type:Number,
        default:0
    },
    like:{
        type:Array,
        default:[]
    },
    tags:{
        type:[String],
        default:[]
    }
    ,
    dislike: {
        type: [String],
        default: []
    },
    userId:{
       type: [String],
       required:true
    }
}, { timestamps: true });

const Video = mongoose.model("Video", VideoSchema);

export default Video;