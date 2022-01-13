import Item from "../models/itemModel.js";
import asyncHandler from "express-async-handler";
import Jobcard from "../models/jobcardModel.js";
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

// @desc Add new Item
// @Route POST /item
// @access Private
const addItem = asyncHandler(async (req, res) => {
    const { user_id, jobcard_id, description, quantity, price } = req.body;
    const total = quantity * price;

    if (!description) {
        res.status(401)
        throw new Error('Description must fill');
    }
    if (!quantity) {
        res.status(401)
        throw new Error('Quantity must fill');
    }
    if (!price) {
        res.status(401)
        throw new Error('Price must fill');
    }
    if (!user_id || !jobcard_id) {
        res.status(401)
        throw new Error('Value Missing');
    }

    const newItem = new Item({
        user: user_id, jobcard_id, description, quantity, rate_per_quantity: price, total_rate: total
    })
    const item = await newItem.save();
    await Jobcard.updateOne({_id:ObjectId(jobcard_id)}, {$inc:{total_amount:total, payable_amount:total}})

    res.json(item);

})


// @desc Fetch items
// @Route GET /item
// @access Private
const getItem = asyncHandler(async (req, res) => {
    const { jobcard_id } = req.query;

    const item = await Item.aggregate([
        {
            $match: { jobcard_id: ObjectId(jobcard_id), isActive: true }
        }
    ])
    res.json(item);
})


// @desc Delete item
// @Route DELETE /item
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
    const { item_id } = req.query;

    const deleteItem = await Item.updateOne({ _id: ObjectId(item_id) }, { isActive: false })
    res.json(deleteItem);
})



export {
    addItem,
    getItem,
    deleteItem
}