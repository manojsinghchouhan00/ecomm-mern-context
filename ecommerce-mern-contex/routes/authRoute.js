import express from "express";
import {registerController, loginController} from "../controller/authController.js"

// route object
const router = express.Router();

// REGISTER || METHOD
router.post('/register',registerController);

// LOHIN || POST
router.post('/login',loginController)

export default router;