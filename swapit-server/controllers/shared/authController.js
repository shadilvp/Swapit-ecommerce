import { User,validateUser } from "../../models/userModel.js";
import { Admin, validateAdmin } from "../../models/adminModel.js";
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import Cookies from 'js-cookie';

dotenv.config()

const JWT_SECRET = process.env.TOKEN_SECRET
const JWT_REFRESH_SECRET = process.env.TOKEN_REFRESH_SECRET
const isProduction = process.env.COOKIE_FLAG === "production"

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
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
    console.log(name, email, password)

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




export const googleAuth = async (req, res) => {
  try {
    console.log("hy")
    const { name, email, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, googleId });
      await user.save();
    }

    // Generate Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    // Set Cookies
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        // sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        // sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
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
    // console.log("Login attempt:", req.body);
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


    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        // sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        // sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // path: "/",
    });


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
        });
    }
};

//Logout --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const logout = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
    
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);    

        if (!refreshToken) {
            return res.status(400).json({ success: false, message: "User already logged out" });
        }

        console.log("successfully loged out")

        let user = await User.findOne({ refreshToken });

        if (!user) {
            user = await Admin.findOne({ refreshToken });
        }

        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.clearCookie("accessToken", { httpOnly: true, secure: process.env.COOKIE_FLAG === "true", sameSite: "Strict" });
        res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.COOKIE_FLAG === "true", sameSite: "Strict" });
        return res.status(200).json({ success: true, message: "Successfully logged out" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};




//refresh Access Token --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const refreshAccessToken = async (req, res) => {

    const {refreshToken} = req.body;
    if (!refreshToken) return res.status(401).json({ message: "Refresh Token Required" });

    try {
        
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)

        const user =   await User.findById(decoded.id)
        if (!user) {
            user = await Admin.findById(decoded.id);
        }

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid Refresh Token" });
        }

        const newAccessToken = generateAccessToken(user._id);
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 15 * 60 * 1000,
        });

        return res.status(200).json({ accessToken: newAccessToken });

    } catch (error) {

        res.status(403).json({ message: "Invalid or Expired Refresh Token" });
    }
}