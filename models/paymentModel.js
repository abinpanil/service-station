import mongoose, { Schema } from 'mongoose';

const paymentSchema = mongoose.Schema({
    jobcard_id: {
        type: Schema.Types.ObjectId,
        ref: 'Jobcard',
        required: true
    },
    amount: {
        type: Number
    }
}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;