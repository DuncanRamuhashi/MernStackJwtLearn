// CAWrgE2zY6BtJkn0
import bcrypt from 'bcryptjs'
import asyncHanhler from 'express-async-handler'
import User from '../models/userModel.js'
import generateTokenNumber from '../utils/generateToken.js';
// @desc auth user/set token
// route Post /api/users/auth
//@access public
const authUser = asyncHanhler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        // Log the password comparison attempt
       
        
        // Use the matchPasswords method to check if the entered password matches the hashed password
        if (await user.matchPasswords(password)) {
            console.log('Password match successful');
            generateTokenNumber(res, user._id);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
           
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } else {
        console.log('User not found');
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc Register user 
// route Post /api/users
//@access public
const registerUser = asyncHanhler(async (req,res) => {
        const {name,email,password} = req.body;
        const userExists = await User.findOne({email}); 
       if (userExists){
         res.status(400);
         throw new Error('User already exits' )
       }
     
       const user = await User.create({
         name,
         email,
         password
       });
    
       if(user){
        generateTokenNumber(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
       }else{
        res.status(400);
        throw new Error('Invalid user data');
       }
    

    
    }); 
    
// @desc Logout user 
// route Post /api/users/logout
//@access public
const logoutUser = asyncHanhler(async (req,res) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    } )
    res.status(200).json({message: 'User Logged  Out'})
    
    }); 
 // @desc get user profile user 
// route Post /api/users/profile
//@access private
const getUserProfile = asyncHanhler(async (req,res) => {
    
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json({user})
    
    });


        // @desc update profile user 
// route Put /api/users/profile
//@access private
const updateUserProfile = asyncHanhler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // Log the user's current details
       
        
        // Update name and email if provided
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // If a new password is provided, hash it and update the user's password
        if (req.body.password) {
               user.password = req.body.password;
        }

        // Save the updated user
        const updatedUser = await user.save();

      

        // Return the updated user response (excluding password)
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


    
export {
 authUser,
 registerUser,
logoutUser,
 getUserProfile,
  updateUserProfile
};