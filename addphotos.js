require('dotenv').config({ path: './config/cloudinary.env' });
const cloudinary = require('cloudinary').v2;
const db = require("../config/firebase"); // Correctly import the database

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
});

// Upload images to Cloudinary
const uploadPhotos = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        // Upload images to Cloudinary
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "virtualgallery" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                ).end(file.buffer);
            });
        });

        const uploadedUrls = await Promise.all(uploadPromises);
         // Ensure Firebase is initialized before calling db.ref
         if (!db) {
            throw new Error("Firebase database not initialized.");
        }

        // Store data in Firebase Realtime Database
        const newFolderRef = db.ref("folders").push(); // Ensure this works
        await newFolderRef.set({
            folderName: req.body.folderName,
            username: req.body.username,
            userId: req.body.userId,
            images: uploadedUrls,
            timestamp: Date.now(),
        });

        res.json({ success: true, images: uploadedUrls, folderId: newFolderRef.key });
       
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Failed to upload images" });
    }
};

module.exports = { uploadPhotos };
