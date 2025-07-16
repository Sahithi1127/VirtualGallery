const db = require("../config/firebase");

// Fetch all folders from Firebase
const getFolders = async (req, res) => {
    try {
        const foldersRef = db.ref("folders");
        const snapshot = await foldersRef.once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ message: "No folders found" });
        }

        const foldersData = snapshot.val();
        const foldersArray = Object.keys(foldersData).map(key => ({
            id: key, // Folder ID
            ...foldersData[key] // Folder details
        }));

        res.json({ success: true, folders: foldersArray });
    } catch (error) {
        console.error("Error fetching folders:", error);
        res.status(500).json({ error: "Failed to fetch folders" });
    }
};

module.exports = { getFolders };
