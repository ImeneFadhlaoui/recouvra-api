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

router.get("/", protectRoute, getAllClients);
router.get("/:id", protectRoute, getClientById);
router.post("/", protectRoute, createClient);
router.put("/:id", protectRoute, checkRole("manager", "admin"), updateClient);
router.delete(
  "/:id",
  protectRoute,
  checkRole("manager", "admin"),
  deleteClient,
);

module.exports = router;
