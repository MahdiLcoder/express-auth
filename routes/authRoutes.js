import express from "express";
import { signUpGet, signUpPost, loginGet, loginPost } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/signup", signUpGet);
router.post("/signup", signUpPost);
router.get("/login", loginGet);
router.post("/login", loginPost);




export default router;