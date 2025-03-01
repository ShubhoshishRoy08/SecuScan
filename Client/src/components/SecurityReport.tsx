import React, { useState } from 'react';
import { AlertOctagon, AlertTriangle, AlertCircle, Info, Download, CheckCircle, XCircle } from 'lucide-react';

const SecurityReport = ({ results }) => {
  const [expandedVulnerability, setExpandedVulnerability] = useState(null);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <AlertOctagon className="h-6 w-6 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-6 w-6 text-orange-500" />;
      case 'medium':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'low':
        return <Info className="h-6 w-6 text-blue-500" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'high':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getRiskLevel = (score) => {
    if (score >= 80) return { text: 'Critical', color: 'text-red-600' };
    if (score >= 60) return { text: 'High', color: 'text-orange-500' };
    if (score >= 40) return { text: 'Medium', color: 'text-yellow-500' };
    return { text: 'Low', color: 'text-blue-500' };
  };

  const riskLevel = getRiskLevel(results.riskScore);

  const toggleVulnerability = (index, severity) => {
    const key = `${severity}-${index}`;
    setExpandedVulnerability(expandedVulnerability === key ? null : key);
  };

  const renderVulnerabilityList = (vulnerabilities, severity) => {
    if (!vulnerabilities || vulnerabilities.length === 0) {
      return (
        <div className="text-gray-500 italic p-4 text-center">
          No {severity} vulnerabilities detected
        </div>
      );
    }

    return vulnerabilities.map((vuln, index) => {
      const isExpanded = expandedVulnerability === `${severity}-${index}`;
      
      return (
        <div 
          key={`${severity}-${index}`} 
          className={`mb-3 border rounded-lg overflow-hidden ${getSeverityColor(severity)}`}
        >
          <div 
            className="p-4 flex items-center justify-between cursor-pointer"
            onClick={() => toggleVulnerability(index, severity)}
          >
            <div className="flex items-center">
              {getSeverityIcon(severity)}
              <span className="ml-3 font-medium">{vuln.name}</span>
            </div>
            <div>
              {isExpanded ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          </div>
          
          {isExpanded && (
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="mb-3">
                <span className="font-medium">Description:</span>
                <p>{vuln.description}</p>
              </div>
              <div className="mb-3">
                <span className="font-medium">Location:</span>
                <p className="font-mono text-sm bg-gray-100 p-1 rounded">{vuln.location}</p>
              </div>
              <div>
                <span className="font-medium">Remediation:</span>
                <p>{vuln.remediation}</p>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Security Analysis Report</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
              <AlertTriangle className="h-6 w-6 text-gray-700" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Risk Score</h3>
            <div className={`text-3xl font-bold ${riskLevel.color}`}>
              {results.riskScore}/100
            </div>
            <p className={`text-sm font-medium ${riskLevel.color}`}>
              {riskLevel.text} Risk
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
              <AlertOctagon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Critical</h3>
            <div className="text-3xl font-bold text-red-600">
              {results.vulnerabilities.critical.length}
            </div>
            <p className="text-sm text-gray-500">Vulnerabilities</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">High</h3>
            <div className="text-3xl font-bold text-orange-500">
              {results.vulnerabilities.high.length}
            </div>
            <p className="text-sm text-gray-500">Vulnerabilities</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
              <Info className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Other</h3>
            <div className="text-3xl font-bold text-blue-500">
              {results.vulnerabilities.medium.length + results.vulnerabilities.low.length}
            </div>
            <p className="text-sm text-gray-500">Vulnerabilities</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-800">Vulnerability Details</h3>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h4 className="flex items-center text-red-600 font-medium mb-3">
              <AlertOctagon className="h-5 w-5 mr-2" />
              Critical Vulnerabilities
            </h4>
            {renderVulnerabilityList(results.vulnerabilities.critical, 'critical')}
          </div>
          
          <div className="mb-6">
            <h4 className="flex items-center text-orange-500 font-medium mb-3">
              <AlertTriangle className="h-5 w-5 mr-2" />
              High Vulnerabilities
            </h4>
            {renderVulnerabilityList(results.vulnerabilities.high, 'high')}
          </div>
          
          <div className="mb-6">
            <h4 className="flex items-center text-yellow-500 font-medium mb-3">
              <AlertCircle className="h-5 w-5 mr-2" />
              Medium Vulnerabilities
            </h4>
            {renderVulnerabilityList(results.vulnerabilities.medium, 'medium')}
          </div>
          
          <div>
            <h4 className="flex items-center text-blue-500 font-medium mb-3">
              <Info className="h-5 w-5 mr-2" />
              Low Vulnerabilities
            </h4>
            {renderVulnerabilityList(results.vulnerabilities.low, 'low')}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-800">Security Recommendations</h3>
        </div>
        
        <div className="p-6">
          <div className="mb-4 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">Implement Checks-Effects-Interactions Pattern</h4>
              <p className="text-gray-600">Always update contract state before making external calls to prevent reentrancy attacks.</p>
            </div>
          </div>
          
          <div className="mb-4 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">Use SafeMath or Solidity 0.8+</h4>
              <p className="text-gray-600">Prevent integer overflow/underflow by using SafeMath library or Solidity 0.8+ which has built-in overflow checks.</p>
            </div>
          </div>
          
          <div className="mb-4 flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">Lock Pragma Version</h4>
              <p className="text-gray-600">Use a specific compiler version rather than a floating pragma to ensure consistent behavior.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800">Implement Access Control</h4>
              <p className="text-gray-600">Use modifiers to restrict function access to authorized users only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityReport;