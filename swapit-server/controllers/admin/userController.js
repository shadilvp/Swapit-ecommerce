import { User } from "../../models/userModel.js";

export const getAllUsers = async (req,res) => {
    let {page, limit, isBlock, search} = req.query;
    
    let filter = {}

    if(search){
        filter.search = { $regax: search, $options:"i" }
    }
    if(isBlock){
        filter.isBlock = isBlock
    }

     page = parseInt(req.query.page) || 1 ;
     limit = parseInt(req.query.limit) || 10 ;
     const skip = (page - 1) * limit ;


    const users = await User.find().skip(skip).limit(limit)

    const totalUsers = await User.countDocuments();

    res.status(200).json({ 
        success: true, 
        currentPage : page,
        totalPages : Math.ceil(totalUsers/limit),
        totalProducts : totalUsers,
        users,
    });
}