import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../database/database";

dotenv.config();

export const login = async(req: Request, res: Response): Promise<any> => {
  try {
    const {email, password} = req.body;
    
    if (!email || !password) {
      return res.status(400).json({message: "Email and password is required"});
    }
    
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({message: "Invalid credentials"});
    }
   
    const payload = {_id: user._id};
    
    // Access token (short-lived)
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {expiresIn: "15m"} // Changed from 5s to 15m for better UX
    );
    
    // Refresh token (long-lived)
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET!,
      {expiresIn: "7d"}
    );
    
    // Detect if request is from React Native or Web
    const isReactNative = req.headers['user-agent']?.includes('ReactNative');
    
    if (isReactNative) {
      // For React Native: Send both tokens in response body
      return res.status(200).json({
        message: "Login successful",
        accessToken,
        refreshToken // Send refresh token in body for React Native
      });
    } else {
      // For Web: Use HttpOnly cookie for refresh token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      
      return res.status(200).json({
        message: "Login successful",
        accessToken
      });
    }
    
  } catch(error) {
    console.log("Login error", error);
    return res.status(500).json({message: "Something went wrong, please try again"});
  }
};

export const register = async(req: Request, res: Response): Promise<any> => {
  try {
    const {fullName, email, password, barangay} = req.body;
  
    if (!fullName || !email || !password || !barangay) {
      return res.status(400).json({message: "All fields are required"});
    }
    
    const exist = await User.findOne({email});
    if (exist) {
      return res.status(409).json({message: "User already exists"});
    }
    
    if (password.length < 5) {
      return res.status(400).json({message: "Password too short"});
    }
     
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      barangay
    });
    
    return res.status(201).json({
      message: "User successfully registered",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });
    
  } catch(error) {
    console.log("Server error", error);
    return res.status(500).json({message: "Internal server error (Register)"});
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  console.log('🚪 Logout request received');
  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "lax",
    path: "/"
  });
  
  return res.status(200).json({
    message: "Logged out successfully"
  });
};

// Add refresh token endpoint
export const refreshToken = async (req: Request, res: Response): Promise<any> => {
  try {
    const isReactNative = req.headers['user-agent']?.includes('ReactNative');
    let refreshToken: string | undefined;
    
    if (isReactNative) {
      // For React Native: Get refresh token from request body
      refreshToken = req.body.refreshToken;
    } else {
      // For Web: Get refresh token from cookie
      refreshToken = req.cookies.refreshToken;
    }
    
    if (!refreshToken) {
      return res.status(401).json({message: "Refresh token required"});
    }
    
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {_id: string};
    
    // Generate new access token
    const newAccessToken = jwt.sign(
      {_id: decoded._id},
      process.env.JWT_SECRET!,
      {expiresIn: "15m"}
    );
    
    return res.status(200).json({
      accessToken: newAccessToken
    });
    
  } catch(error) {
    console.log("Refresh token error", error);
    return res.status(403).json({message: "Invalid or expired refresh token"});
  }
};