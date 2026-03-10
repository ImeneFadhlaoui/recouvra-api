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


/**
 * @swagger
 * /invoices/{id}/payments:
 *   post:
 *     summary: Enregistrer un paiement manuel pour une facture
 *     tags: [Payments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la facture
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 150
 *               method:
 *                 type: string
 *                 example: cash
 *     responses:
 *       201:
 *         description: Paiement enregistré
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Facture introuvable
 */
router.post
(
    "/invoices/:id/payments",
    protectRoute,
    validate(paymentValidation.createPaymentSchema),
    createPayment
);
//---------------------------------------------------------------------------------
/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Récupérer tous les paiements
 *     tags: [Payments]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les paiements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   invoice:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   method:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get
(
    "/payments",
    protectRoute,

    getAllPayments
);
//---------------------------------------------------------------------------------

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Récupérer un paiement par son ID
 *     tags: [Payments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du paiement
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paiement trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 invoice:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 method:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Paiement introuvable
 */
router.get
(
    "/payments/:id",
    protectRoute,
    getPayment
);
//---------------------------------------------------------------------------------

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Supprimer un paiement
 *     tags: [Payments]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du paiement à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paiement supprimé avec succès
 *       404:
 *         description: Paiement introuvable
 */
router.delete
(
    "/payments/:id",
    protectRoute,
    deletePayment
);

module.exports = router;