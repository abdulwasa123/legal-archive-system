// controllers/documentController.js

const Document = require('../models/fileUploadModel');

const uploadDocument = async (req, res) => {
  try {
    const {
      title,
      description,
      caseNumber,
      type,
      parties,
      date,
      status,
      priority,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const document = new Document({
      title,
      description,
      caseNumber,
      type,
      parties,
      date,
      status,
      priority,
      fileUrl,
    });

    await document.save();

    console.log(`✅ Document uploaded: ${title}`);

    res.status(201).json({ message: 'Document uploaded successfully', document });
  } catch (error) {
    console.error('❌ Error uploading document:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllDocuments = async (req, res) => { //display uploaded doc
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    console.error('❌ Error fetching documents:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadDocument, getAllDocuments };
