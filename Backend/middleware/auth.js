import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({message: "Not Authorised, Login Again", success: false});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userID = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({message: "Error", success: false});
    }
}

export default authMiddleware;