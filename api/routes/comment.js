

import Comment from "../models/Comment.js";
import { verifyToken } from "../verifyToken.js";
import express from "express";
const router = express.Router();
import {addcomment,updateComment,deleteComment, getComments} from "../controllers/comment.js";

//ADD COMMENT
router.post("/addcomment",verifyToken, addcomment)
//UPDATE COMMENT
router.put("/:id", updateComment)
//DELETE COMMENT
router.delete("/:id",deleteComment);
//GET ALL COMMENT 
router.get("/find/:videoId", getComments)

export default router