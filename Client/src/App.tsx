import React, { useState } from 'react';
import { Shield, Upload, History, Zap, Code, FileCode, AlertTriangle, CheckCircle, Info, AlertOctagon, BarChart2 } from 'lucide-react';
import ContractUpload from './components/ContractUpload';
import SecurityReport from './components/SecurityReport';
import GasOptimization from './components/GasOptimization';
import TestnetSimulation from './components/TestnetSimulation';
import HistoryView from './components/HistoryView';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [contractCode, setContractCode] = useState('');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleContractSubmit = (code) => {
    setContractCode(code);
    setIsAnalyzing(true);
    
    // Simulate API call to backend for analysis
    setTimeout(() => {
      // Mock analysis results
      const mockResults = {
        riskScore: 75,
        vulnerabilities: {
          critical: [
            {
              name: 'Reentrancy',
              description: 'Contract allows external calls before state updates',
              location: 'withdraw() at line 42',
              remediation: 'Implement checks-effects-interactions pattern'
            }
          ],
          high: [
            {
              name: 'Unchecked Return Value',
              description: 'External call return value not checked',
              location: 'transferTokens() at line 87',
              remediation: 'Add return value check and handle failure cases'
            }
          ],
          medium: [
            {
              name: 'Timestamp Dependence',
              description: 'Contract logic depends on block.timestamp',
              location: 'lockFunds() at line 124',
              remediation: 'Avoid precise timestamp comparisons for critical logic'
            }
          ],
          low: [
            {
              name: 'Floating Pragma',
              description: 'Solidity pragma is not locked to specific version',
              location: 'Line 1',
              remediation: 'Lock pragma to specific version: pragma solidity 0.8.17;'
            }
          ]
        },
        gasOptimization: {
          inefficientFunctions: [
            {
              name: 'processLargeArray()',
              issue: 'Excessive gas usage in loop',
              suggestion: 'Implement batch processing or pagination'
            },
            {
              name: 'updateAllBalances()',
              issue: 'Redundant storage writes',
              suggestion: 'Cache storage variables in memory'
            }
          ]
        },
        testnetSimulation: {
          attacks: [
            {
              name: 'Reentrancy Attack',
              success: true,
              details: 'Contract vulnerable to reentrancy attack via withdraw() function'
            },
            {
              name: 'Front-running Attack',
              success: false,
              details: 'Contract has sufficient protection against front-running'
            }
          ]
        }
      };
      
      setAnalysisResults(mockResults);
      setAnalysisComplete(true);
      setIsAnalyzing(false);
      setActiveTab('report');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-10 w-10 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">SecuScan</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 flex items-center ${activeTab === 'upload' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('upload')}
            >
              <Upload className="h-5 w-5 mr-2" />
              Contract Upload
            </button>
            <button
              className={`px-6 py-4 flex items-center ${activeTab === 'report' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('report')}
              disabled={!analysisComplete}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Security Report
            </button>
            <button
              className={`px-6 py-4 flex items-center ${activeTab === 'gas' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('gas')}
              disabled={!analysisComplete}
            >
              <Zap className="h-5 w-5 mr-2" />
              Gas Optimization
            </button>
            <button
              className={`px-6 py-4 flex items-center ${activeTab === 'testnet' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('testnet')}
              disabled={!analysisComplete}
            >
              <Code className="h-5 w-5 mr-2" />
              Testnet Simulation
            </button>
            <button
              className={`px-6 py-4 flex items-center ${activeTab === 'history' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('history')}
            >
              <History className="h-5 w-5 mr-2" />
              History
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'upload' && (
              <ContractUpload 
                onSubmit={handleContractSubmit} 
                isAnalyzing={isAnalyzing} 
              />
            )}
            
            {activeTab === 'report' && analysisComplete && (
              <SecurityReport results={analysisResults} />
            )}
            
            {activeTab === 'gas' && analysisComplete && (
              <GasOptimization results={analysisResults.gasOptimization} />
            )}
            
            {activeTab === 'testnet' && analysisComplete && (
              <TestnetSimulation results={analysisResults.testnetSimulation} />
            )}
            
            {activeTab === 'history' && (
              <HistoryView />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;