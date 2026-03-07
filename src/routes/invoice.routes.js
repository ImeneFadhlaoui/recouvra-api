const express = require("express");

const { protectRoute, checkRole } = require("../middlewares/auth");
const { getAllInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice } = require("../controllers/invoice.controller");
const validate = require("../middlewares/validate");
const { createInvoiceSchema, updateInvoiceSchema } = require("../validations/invoice.validation");
const router = express.Router();

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Liste toutes les factures
 *     tags: [Factures]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des factures
 */
router.get("/", protectRoute, getAllInvoices);

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Récupérer une facture par ID
 *     tags: [Factures]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Facture trouvée
 *       404:
 *         description: Facture introuvable
 */
router.get("/:id", protectRoute, getInvoiceById);

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Créer une facture
 *     tags: [Factures]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [client, amount, dueDate]
 *             properties:
 *               client:
 *                 type: string
 *               amount:
 *                 type: number
 *               dueDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Facture créée
 *       404:
 *         description: Client introuvable
 */
router.post("/", protectRoute,validate(createInvoiceSchema), createInvoice);

/**
 * @swagger
 * /invoices/{id}:
 *   put:
 *     summary: Modifier une facture
 *     tags: [Factures]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Facture modifiée
 */
router.put("/:id", protectRoute, checkRole("manager", "admin"), validate(updateInvoiceSchema), updateInvoice);

/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     summary: Supprimer une facture
 *     tags: [Factures]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Facture supprimée
 */
router.delete(
  "/:id",
  protectRoute,
  checkRole("admin"),
  deleteInvoice,
);

module.exports = router;
