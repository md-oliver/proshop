import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create new Order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res, next) => {
    res.send("add order items");
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res, next) => {
    res.send("get my order items");
});

// @desc    Get orders by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res, next) => {
    res.send("order by id");
});

// @desc    Update order to pay
// @route   GET /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
    res.send("update order to paid by id");
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/pay
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    res.send("update order to delivered by id");
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res, next) => {
    res.send("get all orders");
});
