const Case = require("../models/caseModel");

// @desc    Add a new case
// @route   POST /api/cases/add
// @access  Private
const addCase = async (req, res) => {
  try {
    const {
      caseNumber,
      title,
      type,
      description,
      status,
      priority,
      filingDate,
      parties,
    } = req.body;

    const existingCase = await Case.findOne({ caseNumber });
    if (existingCase) {
      return res.status(400).json({ message: "Case number already exists" });
    }

    const newCase = new Case({
      caseNumber,
      title,
      type,
      description,
      status,
      priority,
      filingDate,
      parties,
      createdBy: req.user._id, // User who created the case
    });

    const savedCase = await newCase.save();

    console.log(`✅ Case Added: ${title}`);

    res.status(201).json({
      message: "Case added successfully",
      case: savedCase,
    });
  } catch (error) {
    console.error("Error adding case:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Display all cases
// @desc    Get all cases
// @route   GET /api/cases
// @access  Private
const getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 }); // Sort newest first
    res.status(200).json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addCase, getAllCases };
