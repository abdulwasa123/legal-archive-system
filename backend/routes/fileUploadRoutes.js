// routes/documentRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { uploadDocument } = require('../controllers/fileUploadController');

router.post('/upload', upload.single('file'), uploadDocument);

module.exports = router;
