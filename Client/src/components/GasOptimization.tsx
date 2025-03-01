import React from 'react';
import { Zap, TrendingDown, Code, CheckCircle } from 'lucide-react';

const GasOptimization = ({ results }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gas Optimization</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Inefficient Functions</h3>
            <div className="text-3xl font-bold text-purple-600">
              {results.inefficientFunctions.length}
            </div>
            <p className="text-sm text-gray-500">Detected</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
              <TrendingDown className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Potential Savings</h3>
            <div className="text-3xl font-bold text-green-600">
              ~35%
            </div>
            <p className="text-sm text-gray-500">Gas Reduction</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
              <Code className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Optimization Tips</h3>
            <div className="text-3xl font-bold text-blue-600">
              4
            </div>
            <p className="text-sm text-gray-500">Suggestions</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-800">Inefficient Functions</h3>
        </div>
        
        <div className="p-6">
          {results.inefficientFunctions.map((func, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-medium text-gray-800">{func.name}</h4>
              </div>
              
              <div className="ml-7">
                <div className="mb-3">
                  <span className="font-medium text-gray-700">Issue:</span>
                  <p className="text-gray-600">{func.issue}</p>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Suggestion:</span>
                  <p className="text-gray-600">{func.suggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-800">General Optimization Tips</h3>
        </div>
        
        <div className="p-6">
          <div className="mb-4 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">Use Packed Storage</h4>
              <p className="text-gray-600">Pack multiple variables into a single storage slot when possible to reduce gas costs.</p>
            </div>
          </div>
          
          <div className="mb-4 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">Avoid Unnecessary Storage</h4>
              <p className="text-gray-600">Use memory instead of storage when possible, especially in loops.</p>
            </div>
          </div>
          
          <div className="mb-4 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">Optimize Loop Operations</h4>
              <p className="text-gray-600">Cache array length outside of loops and use unchecked blocks for counters in Solidity 0.8+.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">Use Events for Cheap Storage</h4>
              <p className="text-gray-600">Emit events instead of storing data that is only needed off-chain.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasOptimization;