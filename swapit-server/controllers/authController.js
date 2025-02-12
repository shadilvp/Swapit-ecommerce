import { User,validateUser } from "../models/userModel.js";
import { Admin, validateAdmin } from "../models/adminModel.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const JWT_SECRET = process.env.TOKEN_SECRET
const JWT_REFRESH_SECRET = process.env.TOKEN_REFRESH_SECRET

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "15m" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};


//Register a new user --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const userRegister = async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = validateUser(req.body)
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

   //data recieved
    console.log('Received data:', { name, email, password });

    const currentUser = await User.findOne({ email });
    if (currentUser) {
        return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({
        name,
        email,
        password

    })
    console.log(newUser);


    await newUser.save();

    return res.status(201).json({ success: true, message: 'User successfully registered', data: newUser });
};


//Register a admin --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const adminRegister = async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = validateAdmin(req.body)
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

   //data recieved
    console.log('Received data:', { name, email, password });

    const currentAdmin = await Admin.findOne({ email });
    if (currentAdmin) {
        return res.status(409).json({ success: false, message: 'Admin already exists' });
    }

    const newAdmin = new Admin({
        name,
        email,
        password

    })
    console.log(newAdmin);


    await newAdmin.save();

    return res.status(201).json({ success: true, message: 'Admin successfully registered', data: newAdmin });
};


//Login --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const login = async (req, res) => {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email }); // Check Admin first
    let role = "admin";

    if (!user) {
        user = await User.findOne({ email }); // If not Admin, check User
        role = "user";
    }

    if (!user) {
        return res.status(401).json({ success: false, message: "No user found" });
    }

    const isMatch = await bcrypt.compare(String(password), String(user.password));
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid Password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    if (role === "admin") {
        return res.status(200).json({
            success: true,
            message: "Admin successfully logged in",
            role,
            adminData: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            accessToken,
            refreshToken,
        });
    } else {
        return res.status(200).json({
            success: true,
            message: "User successfully logged in",
            role,
            userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            accessToken,
            refreshToken,
        });
    }
};

//refresh Access Token --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const refreshAccessToken = async (req, res) => {
    const {refreshToken} = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh Token Required" });

    try {
        
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
        const user =   await User.findById(decoded.id)

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid Refresh Token" });
        }

        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });

    } catch (error) {

        res.status(403).json({ message: "Invalid or Expired Refresh Token" });
    }
}