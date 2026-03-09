const express = require('express');
const router = express.Router();
const 
{
    createPayment,
    getAllPayments,
    getPayment,
    deletePayment
 } = require('../controllers/payment.controller');
const paymentValidation = require('../validations/payment.validation');
const { protectRoute } = require('../middlewares/auth');
const validate = require('../middlewares/validate');

router.post
(
    "/invoices/:id/payments",
    protectRoute,
    validate(paymentValidation.createPaymentSchema),
    createPayment
);

router.get
(
    "/payments",
    protectRoute,

    getAllPayments
);

router.get
(
    "/payments/:id",
    protectRoute,
    getPayment
);
router.delete
(
    "payments/:id",
    protectRoute,
    deletePayment
);

module.exports = router;