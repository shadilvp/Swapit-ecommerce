import { User } from "../../models/userModel.js";


export const userProfile = async (req,res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }
    console.log("user",userId)

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