import React, { useState } from 'react';
import { Upload, FileCode, Code, AlertTriangle, Zap, CheckCircle } from 'lucide-react';

const ContractUpload = ({ onSubmit, isAnalyzing }) => {
  const [uploadMethod, setUploadMethod] = useState('paste');
  const [contractCode, setContractCode] = useState('');
  const [fileName, setFileName] = useState('');
  const [analysisTypes, setAnalysisTypes] = useState({
    static: true,
    fuzz: false,
    gas: true
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setContractCode(event.target.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contractCode.trim()) {
      onSubmit(contractCode);
    }
  };

  const toggleAnalysisType = (type) => {
    setAnalysisTypes({
      ...analysisTypes,
      [type]: !analysisTypes[type]
    });
  };

  const sampleContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableWallet {
    mapping(address => uint) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount);
        
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");
        
        balances[msg.sender] -= _amount;
    }
}`;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Smart Contract Analysis</h2>
      
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            className={`flex items-center px-4 py-2 rounded-md ${uploadMethod === 'paste' ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setUploadMethod('paste')}
          >
            <Code className="h-5 w-5 mr-2" />
            Paste Code
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-md ${uploadMethod === 'upload' ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setUploadMethod('upload')}
          >
            <FileCode className="h-5 w-5 mr-2" />
            Upload File
          </button>
        </div>
        
        {uploadMethod === 'paste' ? (
          <div>
            <textarea
              className="w-full h-80 p-4 border border-gray-300 rounded-md font-mono text-sm"
              placeholder="Paste your Solidity smart contract code here..."
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
            ></textarea>
            <div className="mt-2 text-right">
              <button 
                className="text-indigo-600 hover:text-indigo-800"
                onClick={() => setContractCode(sampleContract)}
              >
                Load sample vulnerable contract
              </button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Drag and drop your .sol file here or click to browse</p>
            <input
              type="file"
              id="contract-file"
              accept=".sol"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="contract-file"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700"
            >
              Select File
            </label>
            {fileName && (
              <p className="mt-4 text-indigo-600">
                <FileCode className="inline h-5 w-5 mr-1" />
                {fileName}
              </p>
            )}
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Analysis Options</h3>
        <div className="flex flex-wrap gap-4">
          <div 
            className={`flex items-center p-4 border rounded-md cursor-pointer ${analysisTypes.static ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
            onClick={() => toggleAnalysisType('static')}
          >
            <div className={`rounded-full p-2 mr-3 ${analysisTypes.static ? 'bg-indigo-100' : 'bg-gray-100'}`}>
              <AlertTriangle className={`h-5 w-5 ${analysisTypes.static ? 'text-indigo-600' : 'text-gray-500'}`} />
            </div>
            <div>
              <h4 className="font-medium">Static Analysis</h4>
              <p className="text-sm text-gray-600">Slither, Mythril</p>
            </div>
            <div className="ml-auto">
              {analysisTypes.static && <CheckCircle className="h-5 w-5 text-indigo-600" />}
            </div>
          </div>
          
          <div 
            className={`flex items-center p-4 border rounded-md cursor-pointer ${analysisTypes.fuzz ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
            onClick={() => toggleAnalysisType('fuzz')}
          >
            <div className={`rounded-full p-2 mr-3 ${analysisTypes.fuzz ? 'bg-indigo-100' : 'bg-gray-100'}`}>
              <Code className={`h-5 w-5 ${analysisTypes.fuzz ? 'text-indigo-600' : 'text-gray-500'}`} />
            </div>
            <div>
              <h4 className="font-medium">Fuzz Testing</h4>
              <p className="text-sm text-gray-600">Echidna</p>
            </div>
            <div className="ml-auto">
              {analysisTypes.fuzz && <CheckCircle className="h-5 w-5 text-indigo-600" />}
            </div>
          </div>
          
          <div 
            className={`flex items-center p-4 border rounded-md cursor-pointer ${analysisTypes.gas ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
            onClick={() => toggleAnalysisType('gas')}
          >
            <div className={`rounded-full p-2 mr-3 ${analysisTypes.gas ? 'bg-indigo-100' : 'bg-gray-100'}`}>
              <Zap className={`h-5 w-5 ${analysisTypes.gas ? 'text-indigo-600' : 'text-gray-500'}`} />
            </div>
            <div>
              <h4 className="font-medium">Gas Optimization</h4>
              <p className="text-sm text-gray-600">Efficiency analysis</p>
            </div>
            <div className="ml-auto">
              {analysisTypes.gas && <CheckCircle className="h-5 w-5 text-indigo-600" />}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          className={`px-6 py-3 rounded-md text-white font-medium ${isAnalyzing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          onClick={handleSubmit}
          disabled={isAnalyzing || !contractCode.trim()}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Contract...
            </>
          ) : (
            'Run Analysis'
          )}
        </button>
      </div>
    </div>
  );
};

export default ContractUpload;