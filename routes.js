const express = require('express');
const multer = require('multer');
const { uploadPhotos } = require('../controllers/addphotos');
const {getFolders}=require('../controllers/getfolders');
const router = express.Router();

// Configure multer to store images in memory
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
}).array('images', 100); // Accept up to 100 images

// Define route for image upload
router.post('/upload', upload, uploadPhotos);
router.get('/folders',getFolders);

module.exports = router;
