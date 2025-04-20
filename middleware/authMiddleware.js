import jwt from "jsonwebtoken"
import User from "../model/User.js";

export const requireAuth = (req, res, next) => {
    const token = res.cookies.jwt;
    if (!token) {
        res.redirect('/login')
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    }
}


export const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decodedToken.id);
            res.locals.user = user;
        } catch (err) {
            console.log(err.message);
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }

    next();
};
