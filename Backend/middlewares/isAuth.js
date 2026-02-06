import jwt from "jsonwebtoken";
import User from "../module/user.module.js";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const idToFind = decoded.userId || decoded.id || decoded._id; 

    const user = await User.findById(idToFind).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    req.userId = user._id; 
    
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
export default isAuth;