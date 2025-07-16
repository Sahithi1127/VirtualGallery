import React from "react";
import { Link } from "react-router-dom";
import { FaFolder, FaPlus, FaExclamationCircle, FaBars } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ toggleSidebar, isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h1 className="logo">📁</h1>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="menu">
        <li>
          <Link to="/folders">
            <FaFolder className="icon" /> <span className="link-text">Folders</span>
          </Link>
        </li>
        <li>
          <Link to="/create-folder">
            <FaPlus className="icon" /> <span className="link-text">Create Folder</span>
          </Link>
        </li>
        <li>
          <Link to="/complaints">
            <FaExclamationCircle className="icon" /> <span className="link-text">User Complaints</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
