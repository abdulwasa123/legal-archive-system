// models/documentModel.js

const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  caseNumber: {
    type: String,
    required: true,
  },
  type: String, // criminal, civil, family, etc.
  parties: String,
  date: String, // Or Date type
  status: String, // Active, Pending, Resolved
  priority: String, // High, Medium, Low
  fileUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Document', documentSchema);
