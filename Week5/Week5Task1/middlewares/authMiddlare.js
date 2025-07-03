import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_VERIFY_KEY);
        req.user = decode;
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });   
    }
}