

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//SIGNIN
export const Register = async(req,res, next)=>{
    try{
        const userExist = await User.findOne({email:req.body.email});
        if(userExist){
            return res.status(403).json("You are already registerd");
        }else{
            const newUser = new User({
                ...req.body,
                password:await bcrypt.hash(req.body.password, 10) 
            });
            const user = await newUser.save();
            res.status(200).json(user);
        }

    }catch(err){
        next(err)
    }
}

//SIGNUP
export const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(403).json("user not found!")
        }else{
            const hashedPassword = await bcrypt.compare(req.body.password, user.password);
            if(!hashedPassword){
                return res.status(403).json("Invalid credintials");
            }else{
                const token = jwt.sign({ id: user._id, user, }, process.env.SECRET, );
                const {password, ...others} = user._doc;
                res.cookie("token",token,{httpOnly:true}).json({token, others})
            }
        }

    } catch (err) {
        next(err)
    }
}

//SIGNIN WITH GOOGLE 
export const Google = async (req, res, next) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            const newUser = new User({...req.body});
            const saveUser = await newUser.save();
            const token = jwt.sign({ id: saveUser._id, saveUser, }, process.env.SECRET,);
            const { password, ...others } = saveUser._doc;
            res.cookie("token", token, { httpOnly: true }).json({ token, others })
        }else{
            const token = jwt.sign({ id: user._id, user, }, process.env.SECRET,);
            const { password, ...others } = user._doc;
            res.cookie("token", token, { httpOnly: true }).json({ token, others })
            
        }

    } catch (err) {
        console.log(err)
        next(err)
    }
}