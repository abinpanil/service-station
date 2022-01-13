import mongoose from 'mongoose';
const {Schema} = mongoose;

const jobcardSchema = mongoose.Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
    },
    reg_no: {
        type: String,
    },
    vehicle_make: {
        type: String,
    },
    vehicle_model: {
        type: String,
    },
    jobcard_status: {
        type: Number,
        default: 0,
    },
    creation_date:{
      type:Date,
      default: () => Date.now(),  
    },
    creation_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    completion_date: {
        type: Date
    },
    completion_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    delivery_date: {
        type: Date
    },
    delivery_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    total_amount: {
        type: Number,
        default:0
    },
    discount: {
        type: Number,
        default:0
    },
    payable_amount: {
        type: Number,
        default:0
    },
    recieved_amount: {
        type: Number,
        default:0
    },
    isActive: {
        type: Boolean,
        default: true
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