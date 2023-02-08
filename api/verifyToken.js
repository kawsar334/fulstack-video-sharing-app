


import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next)=>{

    const token = req.cookies.token;
    if(!token){
        return res.status(403).json("you are not authenticated")
    }else{
        jwt.verify(token, process.env.SECRET, (err, user)=>{
            if(err){
                res.status(422).json("invalid token")
            }else{
                req.user = user ;
                next();
            }
        })
    }
};


