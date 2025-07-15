const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

// Prevent re-initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://virtual-gallery-fd237-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

// Export db correctly
const db = admin.database();

module.exports = db;  // ✅ Correct export
