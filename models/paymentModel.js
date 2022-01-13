import mongoose from 'mongoose';
const {Schema} = mongoose;

const paymentSchema = mongoose.Schema({
    jobcard_id: {
        type: Schema.Types.ObjectId,
        ref: 'Jobcard',
        required: true
    },
    amount: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;