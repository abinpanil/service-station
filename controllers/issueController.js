import Issue from "../models/issueModel.js";
import asyncHandler from "express-async-handler";
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;


// @desc Add new Issue
// @Route POST /issue
// @access Private
const addIssue = asyncHandler(async (req, res) => {
    const { user_id, jobcard_id, description, remarks } = req.body;

    if (!description) {
        res.status(401)
        throw new Error('Description must fill');
    }
    if (!remarks) {
        res.status(401)
        throw new Error('Remarks must fill');
    }
    if (!user_id || !jobcard_id) {
        res.status(401)
        throw new Error('Values missing');
    }

    const newIssue = new Issue({
        user: user_id, jobcard_id, description, remarks
    })
    const issue = await newIssue.save();

    res.json(issue);

})


// @desc Fetch issues
// @Route GET /issue
// @access Private
const getIssue = asyncHandler(async (req, res) => {
    const { jobcard_id } = req.query;
    console.log(jobcard_id);
    if (!jobcard_id) {
        res.status(401)
        throw new Error('Values missing');
    }

    const issue = await Issue.aggregate([
        {
            $match: { jobcard_id: ObjectId(jobcard_id), isActive:true }
        }
    ]);

    res.json(issue);
})


// @desc Delete Issue
// @Route DELETE /issue
// @access Private
const deleteIssue = asyncHandler(async (req, res) => {
    const { issue_id } = req.query;

    const deleteIssue = await Issue.updateOne({ _id: ObjectId(issue_id) }, { $set: { isActive: false } });
    res.json(deleteIssue);
})


export {
    addIssue,
    deleteIssue,
    getIssue
}