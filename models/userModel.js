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
        lowercase:true,
        unique: true
    },
    mob_no: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;