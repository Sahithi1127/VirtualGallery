import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import UploadForm from "./components/UploadForm";
import Folders from "./pages/Folders";
import UserComplaints from "./pages/UserComplaints";
import Login from './components/Login/Login';
import "./styles/Sidebar.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="app-container">
        <Sidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        <div className="content">
          <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path="/create-folder" element={<UploadForm />} />
            <Route path="/folders" element={<Folders />} />
            <Route path="/complaints" element={<UserComplaints />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

