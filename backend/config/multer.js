// config/multer.js

const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where files go
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// File filter (optional, to allow only certain file types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|txt/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    cb(null, true);
  } else {
    cb(new Error('Only documents are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
