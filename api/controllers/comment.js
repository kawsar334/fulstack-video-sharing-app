

import Comment from "../models/Comment.js";
import Video from "../models/Video.js";



//ADD COMMENT
export const addcomment = async(req,res, next)=>{
    try{
        const newComment= new Comment({...req.body, userId:req.user.id});
        const saveComment = await newComment.save();
        res.status(200).json(saveComment);

    }catch(err){
        next(err);
    }
}
//UPDATE COMMENT
export const updateComment = async (req, res, next) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updatedComment);

    } catch (err) {
        next(err);
    }
}
//DELETE COMMENT
export const deleteComment = async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("comment deleted ")

    } catch (err) {
        next(err);
    }
}
//GET COMMENTS 
export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({videoId:req.params.videoId});
        res.status(200).json(comments);

    } catch (err) {
        next(err);
    }
}


