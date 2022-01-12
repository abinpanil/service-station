import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import generateToken from '../utils/generateToken.js';


// @desc Auth user and get token
// @route POST /user/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        res.status(400)
        throw new Error('Username required');
    }
    if (!password) {
        res.status(400)
        throw new Error('Password required');
    }
    const user = await User.findOne({ username });
    if (!user) {
        res.status(400)
        throw new Error('User not found');
    }
    const passwordCheck = await bcrypt.compare(password, user.passwordHash);
    if(!passwordCheck){
        res.status(400)
        throw new Error('Wrong Password');
    }
    res.json({
        _id:user._id,
        name:user.name,
        username:user.username,
        email:user.email_id,
        mobile:user.mob_no,
        token: generateToken(user._id)
    });
})


// @desc Register new user
// @Route Post /user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {username, password, verifyPassword, name, email, mobile} = req.body;

    if(!username || !password || !verifyPassword || !name || !email || !mobile){
        res.status(400)
        throw new Error('Fill all fields');
    }
    if(password != verifyPassword){
        res.status(400)
        throw new Error('Password doesnt match');
    }
    const existingUser = await User.findOne({ username })
    if(existingUser){
        res.status(400)
        throw new Error('Username already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save user to database
    const newUser = new User({
        username, passwordHash, name, email_id:email, mob_no:mobile
    })
    const user = await newUser.save();
    res.json({
        _id:user._id,
        name:user.name,
        username:user.username,
        email:user.email_id,
        mobile:user.mob_no,
        token: generateToken(user._id)
    })
    
})


export {
    authUser,
    registerUser
}