

import Video from "../models/Video.js";

//ADD VIDEO
export const addVideo = async (req, res, next) => {
    try {

        const newVideo = new Video({...req.body, userId:req.user.id});
        const video = await newVideo.save();
        res.status(200).json(video);
    } catch (err) {
        next(err)
    }
}
//UPDATE VIDEO
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.videoId);

        if(req.user.id ===video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.videoId,{$set:req.body}, {new:true});
            res.status(200).json(updatedVideo)

        }else{
            return res.status(403).json("you can't updated this video !")
        }

    } catch (err) {
        next(err)
    }
}


//GET A VIDEO
export const deleteAVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.videoId);

        if (req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.videoId);
            res.status(200).json("video deleted !")

        }else{
            res.status(403).json("you can't delete this video ")
        }

    } catch (err) {
        next(err)
    }
} 


//add view 
export const addView = async(req , res , next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id, {
            $inc:{views:1}
        });
        res.status(200).json("view hasbeen increased ")

    }catch(err){
        next(err);
    }
}
//GET A VIDEO
export const getAVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.videoId);
        res.status(200).json(video);

    } catch (err) {
        next(err)
    }
} 
//GET VIDEOs
export const getVideos = async (req, res, next) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}
//GET TREND videos
export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({views:-1});
        res.status(200).json(videos);

    } catch (err) {
        next(err);
    }
}

//GET random videos
export const random = async (req, res, next) => {
    try {
     
        const videos = await Video.aggregate([{$sample:{size:40}}]);
        res.status(200).json(videos);

    } catch (err) {
        next(err);
    }
}

//SUBSCRIBED VIDEO 
export const subscribeVideo = async (req, res, next) => {
    try {

     
    } catch (err) {
        next(err);
    }
}


//LIKE video
export const like = async (req, res, next) => {
    try {
        const userId = req.user.id 
        const videoId = req.params.videoId ;
        const  video = await Video.findById(req.params.videoId);
        if(!video.like.includes(userId)){
            const likes = await Video.findByIdAndUpdate(videoId, { $push: { like: userId } });
            await Video.findByIdAndUpdate(videoId, {$pull:{dislike:userId}})
            res.status(200).json({ like: likes.like , dislike:like.dislike});
        }else{
            res.status(403).json("Already liked !");
        }
   
    } catch (err) {
        next(err)
    }
};

//dislike video
export const dislike = async(req, res, next)=>{
    try{
        const userId = req.user.id
        const videoId = req.params.videoId;
        const video = await Video.findById(req.params.videoId);
        if(!video.dislike.includes(userId)){
         const  lists =  await Video.findByIdAndUpdate(req.params.videoId, {$push:{dislike:req.user.id}});
            await Video.findByIdAndUpdate(req.params.videoId, {$pull:{like:req.user.id}});
          return res.status(200).json({list:lists.dislike})
        }else{
            res.status(403).json("Already disliked !")
        }
    }catch(err){
        next(err);
    }
}
//GET VIDEO BY TAGNAME
export const getVideoByTagName = async (req, res, next) => {
    try {
        const tags = req.query.tags.split(",");
        const videos = await Video.find({tags:{$in:tags}}).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err)
    }
};

//search video
export const SearchVideo = async (req, res, next) => {
    try {
        const q = req.query.title;
        const videos = await Video.find({title:{$regex:q, $options:"i"}}).limit(40);
        res.status(200).json(videos)

    } catch (err) {
        next(err)
    }
};


