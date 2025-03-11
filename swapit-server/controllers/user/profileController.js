import { User } from "../../models/userModel.js";
import {Address, validateAddress} from "../../models/addressModel.js"


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


//showing saved addresses ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const loadAddress = async (req,res) => {
    const userId = req.user.id;


    const addresses = await Address.find({userId: userId})

    if(!addresses || addresses.length === 0){
        return res.status(404).json({
            success: false,
            message: "No addresses found for this user."
        });
    }

    return res.status(200).json({
        success:true,
        message: "Addresses retrieved successfully",
        addresses,
    })
}

export const loadSpecificAddress = async (req,res) => {
    const userId = req.user.id;
    const {addressId} = req.params;
    const user = await User.findById(userId)
    if (!user) {
        return  res.status(404).json({success:false,message:"User is not available"})
    }
    const address = await Address.findById(addressId)
    if (!address) {
        return  res.status(404).json({success:false,message:"address is not available"})
    }
    res.status(200).json({success:true, address})
}

//adding new address ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const addAdress = async (req,res) => {
    console.log("hello")
    const userId = req.user.id;
    
    
    if(!userId){
        res.status(400).json({success:false, message:"invalid user"})
    }
    const {firstName, lastName, email, mobile, addressLine, city, state, pinCode, country} = req.body;

    const { error } = validateAddress(req.body);

    if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
    }

    let addressDoc = await Address.findOne({ userId });

    if (!addressDoc) {
        addressDoc = new Address({
            userId,
            addresses: []
        });
    }


    const newAddress = new Address({
        userId,
        firstName,
        lastName,
        email,
        mobile,
        addressLine,
        city,
        state,
        pinCode,
        country,
    });

    await newAddress.save();

    const user = await User.findById(userId);
    if (!user) {
        return { success: false, message: "User not found" };
    }

    user.addresses.push(newAddress._id);
    await user.save();

    return res.status(200).json({success:true, message : newAddress})
}