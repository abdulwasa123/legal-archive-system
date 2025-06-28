const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true, // Example: "CR/001/2024"
  },
  title: {
    type: String,
    required: true, 
    // Example: "State vs John Doe"
  },
  type: {
    type: String,
    required: true,
    enum: ['Criminal', 'Civil', 'Family', 'Appeal', 'Other'],
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Closed', 'Pending', 'Archived'],
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  filingDate: {
    type: Date,
    required: true,
  },
  parties: {
    type: String,
    required: true,
    // Example: "State vs John Doe"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
