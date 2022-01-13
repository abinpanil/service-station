import mongoose, { SchemaTypes } from 'mongoose';

const jobcardSchema = mongoose.Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    reg_no: {
        type: String,
        required: true,
    },
    vehicle_make: {
        type: String,
        required: true
    },
    vehicle_model: {
        type: String,
        required: true
    },
    jobcard_status: {
        type: Number,
        default: 0,
        required: true
    },
    creation_date: () => new Date(),
    completion_date: {
        type: Date
    },
    delivery_date: {
        type: Date
    },
    total_amount: {
        type: Number
    },
    discount: {
        type: Number
    },
    payable_amount: {
        type: Number
    },
    recieved_amount: {
        type: Number
    }

})

const Jobcard = mongoose.model('Jobcard', jobcardSchema);
export default Jobcard;

// jobcardSchema.aggregate(
//     [
//         {
//             $match:{

//             }
//         },
//         {
//             $lookup:{
//                 from:"issues",
//                 localKey:"_id",
//                 foreignKey:"jobcard_id",
//                 as:"demo"
//             }
//         },
//         {
//             $lookup:{
//                 from:"items",
//                 localKey:"_id",
//                 foreignKey:"jobcard_id",
//                 as:"demo"
//             }
//         }
//     ]
// )