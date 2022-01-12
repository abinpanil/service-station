import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
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
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;