import React, { useState, useEffect } from "react";
import "./Folders.css"; // Import external CSS file

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/folders")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFolders(data.folders);
        }
      })
      .catch((error) => console.error("Error fetching folders:", error));
  }, []);

  return (
    <div className="folders-container">
      <h2 className="folders-title">My Folders</h2>
      <div className="folders-grid">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => setSelectedFolder(folder)}
            className="folder-card"
          >
            <h3 className="folder-name">{folder.folderName}</h3>
          </div>
        ))}
      </div>

      {selectedFolder && (
        <div className="modal-overlay" onClick={() => setSelectedFolder(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{selectedFolder.folderName}</h2>
            <div className="image-grid">
              {selectedFolder.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Folder ${selectedFolder.folderName}`}
                  className="image-thumbnail"
                  onClick={() => setZoomedImage(img)}
                />
              ))}
            </div>
            <button className="close-button" onClick={() => setSelectedFolder(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {zoomedImage && (
        <div className="zoom-overlay" onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="Zoomed In" className="zoomed-image" />
        </div>
      )}
    </div>
  );
};

export default Folders;
