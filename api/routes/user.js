

import User from "../models/User.js";
import { verifyToken } from "../verifyToken.js";


import express from "express";
const router = express.Router();
import { updateUser, deleteUser, getAUser, getAllUser, unsubscribe, subscribe} from "../controllers/user.js";

//UPDATE USER 
router.put("/:id",verifyToken,updateUser);
//DELETE USER
router.delete("/:id",deleteUser);

//GET A USER
router.get("/find/:id",getAUser);
//GET ALL USER
router.get("/",getAUser);
// SUBSCRIBE 
router.put("/sub/:userId",verifyToken, subscribe);
router.put("/unsub/:userId",verifyToken, unsubscribe);


export default router