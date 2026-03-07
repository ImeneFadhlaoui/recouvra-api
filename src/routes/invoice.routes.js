const express = require("express");

const { protectRoute, checkRole } = require("../middlewares/auth");
const { getAllInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice } = require("../controllers/invoice.controller");
const router = express.Router();

router.get("/", protectRoute, getAllInvoices);
router.get("/:id", protectRoute, getInvoiceById);
router.post("/", protectRoute, createInvoice);
router.put("/:id", protectRoute, checkRole("manager", "admin"), updateInvoice);
router.delete(
  "/:id",
  protectRoute,
  checkRole("admin"),
  deleteInvoice,
);

module.exports = router;
