import express from "express";
import env from "dotenv";
import { database } from "./databasse.js";
import cookieParser from "cookie-parser";
env.config();
const app = express();
const PORT = process.env.PORT || 4006 ;
import authRout from "./routes/auth.js"
import userRout from "./routes/user.js"
import videoRout from "./routes/video.js"
import commentRout from "./routes/comment.js"





app.use(express.json());
app.use(cookieParser());


app.use("/api/auth/", authRout);
app.use("/api/user/", userRout);
app.use("/api/video/", videoRout);
app.use("/api/comment/", commentRout);



//handling middleware 
app.use((err, req, res,next)=>{
    const status= err.status || 500;
    const message =err.message || "something went wrong";
    return res.status(status).json({
        status,
        message,
        success:false 
    });
});







// connecting database 
database();

app.listen(PORT,()=>{
    console.log(`server running on port number ${PORT}`)
})
