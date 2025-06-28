const express = require("express");
const router = express.Router();

const { addCase, getAllCases } = require("../controllers/caseController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

// ➕ Add Case
router.post("/add", ensureAuthenticated, addCase);

// 📄 Get All Cases
router.get("/", ensureAuthenticated, getAllCases);

module.exports = router;
