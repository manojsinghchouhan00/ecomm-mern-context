import express from "express";
import {registerController, loginController, testController} from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

// route object
const router = express.Router();

// REGISTER || METHOD
router.post('/register',registerController);

// LOHIN || POST
router.post('/login',loginController)

// test route
router.get('/test', requireSignIn ,isAdmin, testController)

export default router;