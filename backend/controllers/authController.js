import { User } from "../models/userModel.js"
import jwt from 'jsonwebtoken'

export const googleAuth = async (req, res) => {
    try {
        const { name, email, avatar } = req.body
        
        // Mock user for guest/no-DB mode
        const mockUser = {
            _id: 'guest_' + Date.now(),
            name,
            email,
            avatar,
            credits: 100,
            plan: 'free'
        };

        const token = jwt.sign({ id: mockUser._id }, process.env.SECRET_KEY || 'fallback_secret', { expiresIn: "7d" })
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }

        res.cookie("token", token, cookieOptions)

        return res.status(200).json(mockUser)

    } catch (error) {
        console.error('Auth error:', error);
        return res.status(500).json({
            success: false,
            message: 'Login failed. Try again.'
        })
    }
}

export const logoutUser = async (_, res) => {
    try {
         res.clearCookie("token")
         return res.status(200).json({message:"User Logout Successfully"})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
