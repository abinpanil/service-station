import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile_no: {
        type: Number,
        required: true,
        unique: true
    },
}, { timestamps: true });

const Customer = mongoose.model('Customer',customerSchema);
export default Customer;