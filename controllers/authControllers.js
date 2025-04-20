import User from "../model/User.js";
import jwt from "jsonwebtoken";
import handleErrors from "../utils/error.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: process.env.JWT_EXPIRE_IN || "1d"
    });

};

// GET: Signup Page
export const signUpGet = (req, res) => {
    res.render("signup");
};

// POST: Signup
export const signUpPost = async (req, res) => {
    const { email, password, confirmPassword } = req.body;


    try {
        const newUser = await User.create({ email, password, confirmPassword });

        const token = createToken(newUser._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        });


        res.status(201).json({
            status: "success",
            data: { user: newUser._id }
        });

    } catch (err) {
        const errors = handleErrors(err, "signup");
        console.log(err.message)
        res.status(400).json({ errors });
    }
};

// GET: Login Page
export const loginGet = (req, res) => {
    res.render("login");
};

// POST: Login
export const loginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await user.correctPassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        });


        res.status(200).json({
            status: "success",
            data: { user: user._id }
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const logOut = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });

    res.redirect('/login')
}