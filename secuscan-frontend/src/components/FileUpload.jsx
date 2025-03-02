import { useState } from "react";
import { uploadFile } from "../api";
import "./FileUpload.css";

export default function FileUpload({ setVulnerabilities }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    setLoading(true);
    const response = await uploadFile(file);
    setLoading(false);

    if (response.vulnerabilities) {
      setVulnerabilities(response.vulnerabilities);
    }

    setMessage(response.message);
  };

  return (
    <div className="file-upload-container">
      <h2 className="upload-title">Upload Solidity File 📂</h2>
      <input 
        type="file" 
        accept=".sol" 
        onChange={(e) => setFile(e.target.files[0])} 
        className="file-input"
      />
      <button 
        onClick={handleUpload} 
        className="upload-button"
      >
        {loading ? "fetching..." : "fetch vulnerabilities"}
      </button>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
}