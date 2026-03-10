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
 *     responses:
 *       200:
 *         description: Action modifiée
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