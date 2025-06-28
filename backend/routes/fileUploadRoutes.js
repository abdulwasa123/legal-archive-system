const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const { 
  uploadDocument, 
  getAllDocuments 
} = require('../controllers/fileUploadController');

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

// Upload document
router.post('/upload', ensureAuthenticated, upload.single('file'), uploadDocument);

// Get all uploaded documents
router.get('/', ensureAuthenticated, getAllDocuments);

module.exports = router;

