import rateLimit from "../config/upstash.js";

const rateLimiter = async (req,res,next)=>{
try {
    const {success} = await rateLimit.limit("my-rate-key");
    if (!success) {
        return res.json({success:false, message:"Too many requests"})
    }
    next();
} catch (error) {
    console.log("rate limit Error ", error);
    next(error);
}
}

export default rateLimiter;