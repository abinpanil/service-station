import Jobcard from "../models/jobcardModel.js";
import asyncHandler from "express-async-handler";
import mongoose from 'mongoose';
import Customer from "../models/customerModel.js";

const ObjectId = mongoose.Types.ObjectId;


// @desc Create new Jobcard
// @Route POST /jobcard
// @access Private
const createJobcard = asyncHandler(async (req, res) => {
    const { name, mobile, user_id, reg_no, vehicle_make, vehicle_model } = req.body;

    if (!name || !mobile || !user_id || !reg_no || !vehicle_make || !vehicle_model) {
        res.status(401)
        throw new Error('Fill all fields');
    }

    let customer = await Customer.findOne({ name: name, mobile_no: mobile });
    if (!customer) {
        const existingMobile = await Customer.exists({ mobile_no: mobile });
        if (existingMobile) {
            res.status(400);
            throw new Error('Mobile number is alreay used another customer');
        }
        const newCustomer = new Customer({
            name, mobile_no: mobile
        });
        customer = await newCustomer.save();
    }

    const newJobcard = new Jobcard({
        creation_user: user_id, customer_id: customer._id, reg_no, vehicle_make, vehicle_model
    })
    const jobcard = await newJobcard.save();

    res.json(jobcard);

})


// @desc Fetch jobcard using user id
// @Route GET /jobcard
// @access Private
const getJobcard = asyncHandler(async (req, res) => {
    const { customer_id } = req.query;

    if (!customer_id) {
        res.status(401)
        throw new Error('Customer Id missing');
    }

    const jobcard = await Jobcard.aggregate([
        {
            $match: { customer_id: ObjectId(customer_id), isActive: true }
        }
    ]);
    if (!jobcard) {
        res.status(401)
        throw new Error('No jobcard for this customer');
    }

    res.json(jobcard);

})


// @desc Delete jobcard
// @Route DELETE /jobcard
// @access Private
const deleteJobcard = asyncHandler(async (req, res) => {
    const { jobcard_id } = req.query;

    const deleteJobcard = await Jobcard.updateOne({ _id: ObjectId(jobcard_id) }, { isActive: false });
    res.json(deleteJobcard);
})


// @desc Change Job status
// @Route PUT /jobcard
// @access private
const changeJobStatus = asyncHandler(async (req, res) => {
    const { user_id, jobcard_id, status } = req.body;
    const date = new Date();

    let changeStatus

    if (status === 1) changeStatus = await Jobcard.updateOne({ _id: ObjectId(jobcard_id) }, {
        completion_date: date,
        completion_user: user_id,
        jobcard_status: status
    })

    if (status === 2) {
        const jobcard = await Jobcard.findOne({ _id: ObjectId(jobcard_id) });
        if (jobcard.payable_amount != 0) {
            res.status(401)
            throw new Error('Complete payment before delivery');
        }
        changeStatus = await Jobcard.updateOne({ _id: ObjectId(jobcard_id) }, {
            delivery_date: () => Date.now(),
            delivery_date: user_id,
            jobcard_status: status
        })
    }

    res.json(changeStatus);
})



export {

    createJobcard,
    getJobcard,
    deleteJobcard,
    changeJobStatus,

}