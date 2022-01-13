import Jobcard from "../models/jobcardModel.js";
import asyncHandler from "express-async-handler";


// @desc Create new Jobcard
// @Route POST /jobcard
// @access Private
const createJobcard = asyncHandler(async (req, res) => {
    const { user_id, customer_id, reg_no, vehicle_make, vehicle_model } = req.body;
    
    if (!user_id || !customer_id || !reg_no || !vehicle_make || !vehicle_model) {
        res.status(401)
        throw new Error('Fill all fields');
    }
    console.log(user_id, customer_id, reg_no, vehicle_make, vehicle_model);

    const newJobcard = new Jobcard({
        creation_user: user_id, customer_id, reg_no, vehicle_make, vehicle_model
    })
    console.log(newJobcard);
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
            $match: { customer_id: customer_id, isActive: true }
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

    const deleteJobcard = await Jobcard.updateOne({ _id: jobcard_id }, { isActive: false });
    res.json(deleteJobcard);
})


// @desc Change Job status
// @Route PUT /jobcard
// @access private
const changeJobStatus = asyncHandler(async (req, res) => {
    const { user_id, jobcard_id, status } = req.body;

    let changeStatus

    if (status === 1) changeStatus = await Jobcard.updateOne({ _id: jobcard_id }, {
        completion_date: () => new Date(),
        completion_user: user_id,
        jobcard_status: status
    })

    if (status === 2) {
        const jobcard = await Jobcard.findOne({ jobcard_id });
        if (jobcard.payable_amount != 0) {
            res.status(401)
            throw new Error('Complete payment before delivery');
        }
        changeStatus = await Jobcard.updateOne({ _id: jobcard_id }, {
            delivery_date: () => new Date(),
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
    changeJobStatus

}