import { useState } from "react";
import FileUpload from "../components/FileUpload";
import CodeEditor from "../components/CodeEditor";
import VulnerabilityReport from "../components/VulnerabilityReport";
import { fetchVulnerabilities } from "../api";
import { analyzeGasUsage } from "../gasAnalysis";
import GasOptimization from "../components/GasOptimization";
import "./Home.css";

export default function Home() {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [code, setCode] = useState("");

  const loadVulnerabilities = async () => {
    const response = await fetchVulnerabilities();
    setVulnerabilities(response.vulnerabilities);
  };

  const [gasResults, setGasResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGasAnalysis = async () => {
    setLoading(true);
    const response = await analyzeGasUsage("contract code here"); // Pass actual Solidity code
    setGasResults(response);
    setLoading(false);
  };

  return (
    <div className="home-container">
      <h1 className="home-title" >SecuScan - Solidity Security Analyzer</h1>
      <div className="home-grid">
        {/* <CodeEditor setCode={setCode} />
        <button
        onClick={loadVulnerabilities}
        className="fetch-button"
      >
        Fetch Vulnerabilities
      </button> */}
        <FileUpload setVulnerabilities={setVulnerabilities} />
      </div>
      
      <VulnerabilityReport vulnerabilities={vulnerabilities} />
      <div className="container mx-auto p-6">
      <button
        onClick={handleGasAnalysis}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Analyze Gas Usage
      </button>

      {loading && <p className="text-gray-500 mt-4">Analyzing gas usage...</p>}

      {gasResults && <GasOptimization results={gasResults} />}
    </div>
    </div>
  );
}