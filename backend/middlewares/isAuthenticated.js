import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({
                message: "Token not found"
            })
        }
        const secret = process.env.SECRET_KEY || 'fallback_secret';
        const decoded = jwt.verify(token, secret)
        
        // Mock user for guest
        req.user = {
            _id: decoded.id,
            name: 'Guest User',
            email: 'guest@dora.ai',
            credits: 100,
            plan: 'free'
        };
        
        next()
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}
