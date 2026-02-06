
import User from "../module/user.module.js";
import uploadOnCloudinary from "../Config/cloudinary.js"
export const getCurrentUser = async (req, res) => {
  try {
    let userId = req.userId
    let user = await User.findById(userId).select("-password")

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: `Current user error ${error}` })
  }
}
export const editProfile = async (req, res) => {
  try {
    let { name } = req.body;

    let updateData = {};
    if (name) updateData.name = name;

    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path);
      updateData.image = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: "Profile update failed" });
  }
};
export const getOtherUsers = async (req, res) => {
  try {
    let users = await User.find({
      _id: { $ne: req.userId }
    }).select("-password")
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `get  other users error ${error}` });
  }
}


export const Search = async (req, res) => {
  try {
    let { query } = req.query
    if (!query) {
      return res.status(400).json({ message: "Query is required" })
    }
    let users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ]
    })
    return res.status(200).json(users);
  } catch (error) {
return res.status(500).json({ message: `Search users error ${error}` });
  }
}