const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/stats.controllers');
const { protectRoute } = require('../middlewares/auth');

/**
 * @swagger
 * /stats/stats:
 *   get:
 *     summary: Obtenir les statistiques globales
 *     tags: [Statistics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées
 */

router.get
(
    "/",
    protectRoute,
    getStats
);


module.exports = router;