import jwt from "jsonwebtoken"

const requireAuth = (req, res, next) => {
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

export default requireAuth