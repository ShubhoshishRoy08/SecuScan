import React from 'react';
import { History, Calendar, FileText, AlertTriangle, CheckCircle, Download } from 'lucide-react';

const HistoryView = () => {
  // Mock data for previous analyses
  const analysisHistory = [
    {
      id: 'scan-001',
      contractName: 'TokenSwap.sol',
      date: '2025-04-15',
      riskScore: 85,
      criticalIssues: 2,
      highIssues: 3,
      status: 'Vulnerable'
    },
    {
      id: 'scan-002',
      contractName: 'StakingRewards.sol',
      date: '2025-04-10',
      riskScore: 42,
      criticalIssues: 0,
      highIssues: 1,
      status: 'Moderate Risk'
    },
    {
      id: 'scan-003',
      contractName: 'NFTMarketplace.sol',
      date: '2025-04-05',
      riskScore: 68,
      criticalIssues: 1,
      highIssues: 2,
      status: 'High Risk'
    },
    {
      id: 'scan-004',
      contractName: 'SecureVault.sol',
      date: '2025-04-01',
      riskScore: 12,
      criticalIssues: 0,
      highIssues: 0,
      status: 'Secure'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Vulnerable':
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {status}
          </span>
        );
      case 'High Risk':
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {status}
          </span>
        );
      case 'Moderate Risk':
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {status}
          </span>
        );
      case 'Secure':
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Analysis History</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">Recent Analyses</h3>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contracts..."
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <svg className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issues
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analysisHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">{item.contractName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{item.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      item.riskScore >= 70 ? 'text-red-600' : 
                      item.riskScore >= 40 ? 'text-orange-500' : 
                      'text-green-600'
                    }`}>
                      {item.riskScore}/100
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {item.criticalIssues > 0 && (
                        <span className="text-red-600 font-medium mr-2">
                          {item.criticalIssues} Critical
                        </span>
                      )}
                      {item.highIssues > 0 && (
                        <span className="text-orange-500 font-medium">
                          {item.highIssues} High
                        </span>
                      )}
                      {item.criticalIssues === 0 && item.highIssues === 0 && (
                        <span className="text-green-600 font-medium">
                          No major issues
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-800">Analytics</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-4">Vulnerability Trends</h4>
              <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500">Chart visualization would appear here</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-4">Risk Score History</h4>
              <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500">Chart visualization would appear here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;