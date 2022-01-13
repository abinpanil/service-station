import Customer from '../models/customerModel.js';
import asyncHandler from 'express-async-handler';


// @desc Create new Customer
// @route POST /customer
// @access Private
const createCustomer = asyncHandler(async (req, res) => {
    const { name, mobile } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Name is mandatory');
    }
    if (!mobile) {
        res.status(400);
        throw new Error('Mobile number is mandatory');
    }
    const existingMobile = await Customer.findOne({ mobile_no: mobile });
    if (existingMobile) {
        res.status(400);
        throw new Error('Mobile number already exists');
    }
    const newCustomer = new Customer({
        name, mobile_no: mobile
    });
    const customer = await newCustomer.save();
    res.status(201).json(customer);
})

// @desc Fetch customer
// @route GET /customer
// @access Private
const getCustomer = asyncHandler(async (req, res) => {
    let { name, mobile } = req.query;
    mobile = parseInt(mobile);
    if (!name) name = ""
    if (!mobile) mobile = ""

    const customer = await Customer.aggregate([
        {
            $match: {
                $or: [
                    { mobile_no: mobile },
                    { name: { $regex: name, $options: 'i' } }
                ]
            }
        },
        {
            $match: { isActive: true }
        }
    ])
    if (!customer.length) {
        res.status(401)
        throw new Error('Customer not found');
    }

    res.json(customer);
});

// @desc Fetch customer
// @route DELETE /customer
// @access Private
const deleteCustomer = asyncHandler(async (req, res) => {
    let { id } = req.query;
    console.log(id);
    const deleteCustomer = await Customer.updateOne({_id:id},{isActive:false});
    res.json(deleteCustomer);
})

export {
    createCustomer,
    getCustomer,
    deleteCustomer
}