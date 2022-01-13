import mongoose from 'mongoose';
const {Schema} = mongoose;

const itemSchema = mongoose.Schema({
    jobcard_id: {
        type: Schema.Types.ObjectId,
        ref: 'Jobcard',
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    rate_per_quantity: {
        type: Number
    },
    total_rate: {
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

const Item = mongoose.model('Item', itemSchema);
export default Item;