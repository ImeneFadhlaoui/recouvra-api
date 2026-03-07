const express = require("express");
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clients.controller");
const { protectRoute, checkRole } = require("../middlewares/auth");
const router = express.Router();

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Liste tous les clients
 *     tags: [Clients]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des clients
 *       401:
 *         description: Non authentifié
 */
router.get("/", protectRoute, getAllClients);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Récupérer un client par ID
 *     tags: [Clients]
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
 *         description: Client trouvé
 *       404:
 *         description: Client introuvable
 */
router.get("/:id", protectRoute, getClientById);

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Créer un client
 *     tags: [Clients]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               company:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive, blacklisted]
 *     responses:
 *       201:
 *         description: Client créé
 */
router.post("/", protectRoute, createClient);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Modifier un client
 *     tags: [Clients]
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
 *         description: Client modifié
 *       404:
 *         description: Client introuvable
 */
router.put("/:id", protectRoute, checkRole("manager", "admin"), updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Supprimer un client
 *     tags: [Clients]
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
 *         description: Client supprimé
 *       404:
 *         description: Client introuvable
 */
router.delete(
  "/:id",
  protectRoute,
  checkRole("manager", "admin"),
  deleteClient,
);

module.exports = router;
