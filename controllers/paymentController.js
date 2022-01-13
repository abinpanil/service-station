import Payment from "../models/paymentModel.js";
import asyncHandler from "express-async-handler";
import mongoose from 'mongoose';
import Jobcard from "../models/jobcardModel.js";

const ObjectId = mongoose.Types.ObjectId;


// @desc Make new Payment
// @Route POST /payment
// @access Private
const makePayment = asyncHandler(async (req, res) => {
    const { user_id, jobcard_id, amount } = req.body;

    if (!user_id || !jobcard_id || !amount) {
        res.status(401)
        throw new Error('Value missing');
    }

    const newPayment = new Payment({
        user: user_id, jobcard_id, amount
    })
    const paymet = await newPayment.save();
    await Jobcard.updateOne({ _id: ObjectId(jobcard_id) }, { $inc: { recieved_amount: amount, payable_amount: -amount } })

    res.json(paymet);
})


// @desc Fetch payments
// @Route GET /payment
// @access Private
const getPayment = asyncHandler(async (req, res) => {
    const { jobcard_id } = req.query;

    const payments = await Payment.aggregate([
        {
            $match: { jobcard_id: ObjectId(jobcard_id), isActive: true }
        }
    ])
    res.json(payments);
})


export {
    makePayment,
    getPayment,
}