import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UploadForm.css";

const UploadForm = () => {
  const [folderName, setFolderName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(""); // New userId field
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files.length > 100) {
      alert("⚠️ You can upload a maximum of 100 images.");
      return;
    }
    setPhotos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("folderName", folderName);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("userId", userId); // Append userId to formData

    for (let i = 0; i < photos.length; i++) {
      formData.append("images", photos[i]);
    }

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Folder Created & Photos Uploaded Successfully");
      navigate("/folders");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("❌ Upload Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Create Folder & Upload Photos</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="text" placeholder="Folder Name" value={folderName} onChange={(e) => setFolderName(e.target.value)} required />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />

        <label className="file-label">
          Select up to 100 images
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        </label>

        {photos.length > 0 && <p className="file-count">{photos.length} file(s) selected</p>}
        
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
