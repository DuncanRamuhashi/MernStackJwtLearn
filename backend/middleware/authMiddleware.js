import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;
    
    // Extract token from cookies
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify token and decode the user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach user to the request object
            req.user = await User.findById(decoded.userId).select('-password');
            
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            // Handle invalid token error
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    } else {
        // Handle missing token error
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});


export {protect} ;  //because maybe admins