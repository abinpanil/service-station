import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
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
    if (!passwordCheck) {
        res.status(400)
        throw new Error('Wrong Password');
    }


    const token = generateToken(user._id);
    res.cookie('token', token, {
        httpOnly: true
    })
    res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email_id,
        mobile: user.mob_no,
        token: token
    });
})


// @desc Register new user
// @Route Post /user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, password, verifyPassword, name, email, mobile } = req.body;

    if (!username || !password || !verifyPassword || !name || !email || !mobile) {
        res.status(400)
        throw new Error('Fill all fields');
    }
    if (password != verifyPassword) {
        res.status(400)
        throw new Error('Password doesnt match');
    }
    const existingUser = await User.exists({ username }) 
    if (existingUser) {
        res.status(400)
        throw new Error('Username already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save user to database
    const newUser = new User({
        username, passwordHash, name, email_id: email, mob_no: mobile
    })
    const user = await newUser.save();

    const token = generateToken(user._id);
    res.cookie('token', token, {
        httpOnly: true
    })
    res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email_id,
        mobile: user.mob_no,
        token: token
    })

})

// @desc Logout user
// @Route Post /user/logout
// @access Public
const logoutUser = asyncHandler((req, res) => {
    res.cookie('token', '', {
        httpOnly: true
    }).send();
})

export {
    authUser,
    registerUser,
    logoutUser
}