import mongoose from 'mongoose';
const {Schema} = mongoose;

const issueSchema = mongoose.Schema({
    jobcard_id: {
        type: Schema.Types.ObjectId,
        ref: 'Jobcard',
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    remarks: {
        type: String
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

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;