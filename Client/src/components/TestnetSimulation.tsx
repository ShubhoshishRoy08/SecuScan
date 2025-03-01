import React from 'react';
import { Code, CheckCircle, XCircle, Play, AlertTriangle } from 'lucide-react';

const TestnetSimulation = ({ results }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Testnet Simulation</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Play className="h-4 w-4 mr-2" />
          Run New Simulation
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-800">Attack Simulations</h3>
          <p className="text-sm text-gray-600">Results from simulating common attack vectors on your contract</p>
        </div>
        
        <div className="p-6">
          {results.attacks.map((attack, index) => (
            <div key={index} className="mb-6 last:mb-0 border rounded-lg overflow-hidden">
              <div className={`p-4 flex items-center justify-between ${attack.success ? 'bg-red-50' : 'bg-green-50'}`}>
                <div className="flex items-center">
                  {attack.success ? (
                    <XCircle className="h-5 w-5 text-red-600 mr-3" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  )}
                  <span className="font-medium">{attack.name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${attack.success ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {attack.success ? 'Vulnerable' : 'Protected'}
                </span>
              </div>
              
              <div className="p-4 bg-white">
                <div className="mb-3">
                  <span className="font-medium text-gray-700">Details:</span>
                  <p className="text-gray-600">{attack.details}</p>
                </div>
                
                {attack.success && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-yellow-800">Recommendation:</span>
                      <p className="text-yellow-700">
                        {attack.name === 'Reentrancy Attack' 
                          ? 'Implement the checks-effects-interactions pattern. Update state variables before making external calls.' 
                          : 'Add appropriate protection mechanisms to prevent this attack vector.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-800">Simulation Environment</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Network Configuration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-medium">Local Hardhat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chain ID:</span>
                  <span className="font-medium">31337</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Block Gas Limit:</span>
                  <span className="font-medium">30,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Solidity Version:</span>
                  <span className="font-medium">0.8.17</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Test Accounts</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Owner:</span>
                  <span className="font-mono truncate">0xf39Fd6e51...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Attacker:</span>
                  <span className="font-mono truncate">0x70997970...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">User 1:</span>
                  <span className="font-mono truncate">0x3C44CdDdB...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">User 2:</span>
                  <span className="font-mono truncate">0x90F79bf6...</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-2">Simulation Logs</h4>
            <div className="bg-gray-900 text-gray-200 p-4 rounded-lg font-mono text-sm h-40 overflow-y-auto">
              <div className="text-green-400">[+] Starting simulation...</div>
              <div className="text-gray-400">[*] Deploying contract...</div>
              <div className="text-gray-400">[*] Contract deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3</div>
              <div className="text-gray-400">[*] Running reentrancy attack simulation...</div>
              <div className="text-red-400">[-] Reentrancy attack successful! Contract vulnerable.</div>
              <div className="text-gray-400">[*] Running front-running attack simulation...</div>
              <div className="text-green-400">[+] Front-running attack failed. Contract protected.</div>
              <div className="text-gray-400">[*] Simulation complete.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestnetSimulation;