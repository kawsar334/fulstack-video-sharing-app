
;

import express, { Router } from "express";
const router = express.Router();
import {Register,Login,Google} from "../controllers/auth.js";



//SIGNUP

router.post("/register",Register);
//SIGNIN
router.post("/login", Login);

//SIGNIN WITH GOOGLE
router.post("/google", Google);



export default router