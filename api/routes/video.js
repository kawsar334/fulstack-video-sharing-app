

import Video from "../models/Video.js";
import { verifyToken } from "../verifyToken.js";

import express from "express";
const router = express.Router();
import { addVideo, updateVideo, getVideos, getAVideo, deleteAVideo, like, trend, subscribeVideo, random, addView, dislike, getVideoByTagName, SearchVideo } from "../controllers/video.js";

//add video
router.post("/addvideo",verifyToken,addVideo);
//UPDATE VIDEO
router.put("/:videoId",verifyToken,updateVideo);
//DELETE VIDEO
router.delete("/:videoId",verifyToken,deleteAVideo) 
//GET VIDEO 
router.get("/find/:videoId",getAVideo);
//add view
router.put("/:id")
//GET VIDEOS
router.get("/", getVideos);
//get video by tags name 
router.get(`/tags`, getVideoByTagName);
//SEARCH VIDEOS
router.get("/search", SearchVideo)
//TREND 
router.get("/trend", trend)
//random video
router.get("/random", random);
//add view 
router.put("/:id",addView);
//subscribedvideo
router.get("/subvideo",verifyToken, subscribeVideo)
//LIKE 
router.put("/like/:videoId",verifyToken, like);
router.put("/dislike/:videoId", verifyToken, dislike);



export default router