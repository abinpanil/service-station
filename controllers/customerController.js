import Customer from '../models/customerModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

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
    const existingMobile = await Customer.exists({ mobile_no: mobile });
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
    let customer
    if (!name && mobile) {

        mobile = parseInt(mobile);
        customer = await Customer.find({ mobile_no: mobile, isActive: true });
    }
    if (!mobile && name) {
        customer = await Customer.find({ name: name, isActive: true });
    }
    if (mobile && name) {

        mobile = parseInt(mobile);
        customer = await Customer.findOne({ mobile_no: mobile, name: name, isActive: true });
    }
    if (!customer) {
        res.status(401)
        throw new Error('Customer not found');
    }
    res.json(customer);
});

// @desc Delete customer
// @route DELETE /customer
// @access Private
const deleteCustomer = asyncHandler(async (req, res) => {
    let { id } = req.query;

    const deleteCustomer = await Customer.updateOne({ _id: ObjectId(id) }, { isActive: false });
    res.json(deleteCustomer);
})

export {
    createCustomer,
    getCustomer,
    deleteCustomer
}
