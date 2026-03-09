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

router.post
(
    "/",protectRoute,validate(createRecoverySchema),
    createAction
);

router.get
(
    "/",

    protectRoute,getAllActions
);
router.get

(
    "/:id",
    protectRoute,
    getAction
);

router.patch
(
    "/:id",
    protectRoute,validate(updateRecoverySchema),
    UpdateAction
);

router.delete
(
    "/:id",
    protectRoute,
    deleteAction
);
