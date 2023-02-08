

import User from "../models/User.js";
import bcrypt from "bcrypt";

//UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
       if(req.user.id ===req.params.id){
           const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
           res.status(200).json(updatedUser)
       }else{
        return res.status(403).json("You can update only Your account!")
       }
    } catch (err) {
        next(err)
    }
}


//DELETE  USER
export const deleteUser = async (req, res, next) => {

    try {
      if(req.user.id===req.params.id){
          const deletedUser = await User.findByIdAndDelete(req.params.id);
          if (!deletedUser) {
              return res.status(403).json("user not found !")
          } else {
              res.status(200).json("user deleted successfully !")
          }
      }else{
        return res.status(403).json("You can delete only Your account !")
      }

    } catch (err) { 
        next(err)
    } 
}

//GET A USER 
//UPDATE USER
export const getAUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id);
       return res.status(200).json(user); 
    } catch (err) {
        next(err)
    }
}

//GET ALL  USER
export const getAllUser = async (req, res, next) => {
    const Nquery = req.query.new
    try {
        const users = Nquery ? await User.find().sort({_id:-1}) : await User.find();
        res.status(200).json(users)

    } catch (err) {
        next(err)
    } 
}


//SUBSCRIBE
export const subscribe = async (req, res, next) => {
    try {
        const  user = await User.findById(req.user.id);
        if(!user.subscribedUsers.includes(req.params.userId)){
            const list = await User.findByIdAndUpdate(req.user.id, { $push: { subscribedUsers: req.params.userId } });
            await User.findByIdAndUpdate(req.params.userId, {
                $inc: { subscribers: 1 }
            });
            res.status(200).json({ user: list.subscribedUsers })
        } else {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { subscribedUsers: req.params.userId },

            });
            await User.findByIdAndUpdate(req.params.userId, {
                $inc: { subscribers: - 1 }
            })
            res.status(403).json("unsubscribed !");
        };
    } catch (err) {
        next(err)
    }
}

export const unsubscribe = async(req, res, next)=>{
    try{
       
        // const user = await User.findById(req.user.id);
        // console.log(user)
        // if(user.subscribedUsers.includes(req.params.userId)){
         
        // }else{
        //     res.status(403).json("Already unsubscibed !")
        // };
        

    }catch(err){
        next(err);
    }
}




