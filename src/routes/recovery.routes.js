const express = require('express');
const router = express.Router();
const 
    {
    createAction,
    UpdateAction,
    getAllActions,
    getAction,
    deleteAction
    } = require('../controllers/recovery.controller');
const {createRecoverySchema,updateRecoverySchema} = require('../validations/recovery.validation');
const validate = require('../middlewares/validate');
const { protectRoute } = require('../middlewares/auth');


/**
 * @swagger
 * /recovery:
 *   post:
 *     summary: Créer une action de recouvrement
 *     tags: [Recovery]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice:
 *                 type: string
 *               type:
 *                 type: string
 *                 example: call
 *     responses:
 *       201:
 *         description: Action créée
 */
router.post
(
    "/",protectRoute,validate(createRecoverySchema),
    createAction
);

//---------------------------------------------------------------------------------
/**
 * @swagger
 * /recovery:
 *   get:
 *     summary: Liste des actions de recouvrement
 *     tags: [Recovery]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste récupérée
 */
router.get
(
    "/",

    protectRoute,getAllActions
);
//---------------------------------------------------------------------------------
/**
 * @swagger
 * /recovery/{id}:
 *   get:
 *     summary: Récupérer une action
 *     tags: [Recovery]
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
 *         description: Action trouvée
 *       404:
 *         description: Action introuvable
 */


router.get

(
    "/:id",
    protectRoute,
    getAction
);
//---------------------------------------------------------------------------------
/**
 * @swagger
 * /recovery/{id}:
 *   patch:
 *     summary: Modifier une action de recouvrement
 *     tags: [Recovery]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'action de recouvrement à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice:
 *                 type: string
 *                 description: ID de la facture associée (ObjectId)
 *                 example: "64abc123def4567890ghij12"
 *               type:
 *                 type: string
 *                 enum: [call, email, letter, legal]
 *                 description: Type d'action de recouvrement
 *                 example: email
 *               description:
 *                 type: string
 *                 description: Description de l'action
 *                 example: "Relance client par email"
 *               actionDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date de l'action
 *                 example: "2024-06-01T10:00:00Z"
 *               createdBy:
 *                 type: string
 *                 description: ID de l'utilisateur ayant créé l'action (ObjectId)
 *                 example: "64abc123def4567890ghij99"
 *     responses:
 *       200:
 *         description: Action modifiée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64abc123def4567890ghij00"
 *                 invoice:
 *                   type: string
 *                   example: "64abc123def4567890ghij12"
 *                 type:
 *                   type: string
 *                   enum: [call, email, letter, legal]
 *                   example: email
 *                 description:
 *                   type: string
 *                   example: "Relance client par email"
 *                 actionDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-01T10:00:00Z"
 *                 createdBy:
 *                   type: string
 *                   example: "64abc123def4567890ghij99"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-05-01T08:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-01T10:00:00Z"
 *       404:
 *         description: Action de recouvrement introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: cant update, recovery action not found
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.patch
(
    "/:id",
    protectRoute,validate(updateRecoverySchema),
    UpdateAction
);
//---------------------------------------------------------------------------------
/**
 * @swagger
 * /recovery/{id}:
 *   delete:
 *     summary: Supprimer une action
 *     tags: [Recovery]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Action supprimée
 */
router.delete
(
    "/:id",
    protectRoute,
    deleteAction
);

module.exports = router;