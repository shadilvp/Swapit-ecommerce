import { User } from "../../models/userModel.js";


export const userProfile = async (req,res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }
    const user = await User.findOne({_id:userId, isBlock:false}).select("-password");
    if(!user){
        res.status(400).json({success:false, message:"user is not found"})
    }
    res.status(200).json(
        {
            success:true,
            user
        }
    )
};


export const editProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {name,email,phone} = req.body
        const profileImage = req.file?.path;
        console.log(profileImage)
    
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
        }
    
        const user = await User.findOne({_id:userId, isBlock:false}).select("-password");
        if(!user){
            res.status(400).json({success:false, message:"user is not found"})
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (profileImage) user.profileImage = profileImage;
        if (phone) user.phone = phone;
    
        await user.save();
    
        res.status(200).json({ success: true, message: "Profile updated successfully", user });
    } catch (error) {
        console.log(error)
    }

}