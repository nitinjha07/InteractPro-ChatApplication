const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            Error: "You are not authenticated"
        });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if(err){
            return res.status(403).json({
                Error: "Token is not valid"
            });
        }
        req.id = payload.id;
        next();
    })
}

module.exports = verifyToken;