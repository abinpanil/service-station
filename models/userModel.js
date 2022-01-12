import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    mob_no: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);