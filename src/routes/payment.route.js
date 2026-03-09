const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const paymentValidation = require('../validations/payment.validation');
const {protectRoute} = require('../middlewares/auth');

router.post
(
    "/invoices/:id/payments",
    protectRoute,
    validate(paymentValidation.createPaymentSchema),
    paymentController.createPayment
);

module.exports = router;