import mongoose, { Schema } from 'mongoose';

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
    }
}, { timestamps: true })

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;