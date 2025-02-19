import { User } from "../../models/userModel.js";


export const userProfile = async (req,res) => {
    const userId = req.user.id;

    const user = await User.findOne({_id:userId, isBlock:false})
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