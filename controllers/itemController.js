import Item from "../models/itemModel.js";
import asyncHandler from "express-async-handler";

// @desc Add new Item
// @Route POST /item
// @access Private
const addItem = asyncHandler(async (req, res) => {
    const { user_id, jobcard_id, description, quantity, rate_per_quantity } = req.body;

    if (!description) {
        res.status(401)
        throw new Error('Description must fill');
    }
    if (!quantity) {
        res.status(401)
        throw new Error('Quantity must fill');
    }
    if (!rate_per_quantity) {
        res.status(401)
        throw new Error('Price must fill');
    }
    if (!user_id || !jobcard_id) {
        res.status(401)
        throw new Error('Value Missing');
    }

    const newItem = new Item({
        user: user_id, jobcard_id, description, quantity, rate_per_quantity
    })
    const item = await newItem.save();

    res.json(item);

})


// @desc Fetch items
// @Route GET /item
// @access Private
const getItem = asyncHandler(async (req, res) => {
    const { jobcard_id } = req.query;

    const item = await Item.aggregate([
        {
            $match: { jobcard_id: jobcard_id, isActive: true }
        }
    ])
    res.json(item);
})


// @desc Delete item
// @Route DELETE /item
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
    const { item_id } = req.query;

    const deleteItem = await Item.updateOne({ _id: item_id }, { isActive: false })
})



export {
    addItem,
    getItem,
    deleteItem
}