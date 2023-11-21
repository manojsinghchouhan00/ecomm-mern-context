import express from "express";
import {registerController} from "../controller/authController.js"

// route object
const router = express.Router();

// REGISTER || METHOD
router.post('/register',registerController);

export default router;