import express from "express";
import { signUpGet, signUpPost, loginGet, loginPost } from "../controllers/authControllers.js";
import { checkUser } from "../middleware/authMiddleware.js"

const router = express.Router();

// router.get('*', checkUser);
router.get("/signup", signUpGet);
router.post("/signup", signUpPost);
router.get("/login", loginGet);
router.post("/login", loginPost);





export default router;