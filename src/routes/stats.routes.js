const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/stats.controllers');
const { protectRoute } = require('../middlewares/auth');



router.get
(
    "/stats/",
    protectRoute,
    getStats
);


module.exports = router;