import React from "react";
import { Zap, TrendingDown, Code, CheckCircle } from "lucide-react";
import "./GasOptimization.css"; // Import the CSS file

const GasOptimization = ({ results = { inefficientFunctions: [] } }) => {
  // Ensure results.inefficientFunctions is always an array
  if (!results || !Array.isArray(results.inefficientFunctions)) {
    return <p>Loading gas optimization data...</p>;
  }

  return (
    <div className="gas-optimization-container">
      <div className="header">
        <h2>Gas Optimization</h2>
      </div>

      <div className="stats-grid">
        <div className="card purple">
          <div className="icon">
            <Zap className="icon-size" />
          </div>
          <h3>Inefficient Functions</h3>
          <div className="number">{results?.inefficientFunctions?.length || 0}</div>
          <p>Detected</p>
        </div>

        <div className="card green">
          <div className="icon">
            <TrendingDown className="icon-size" />
          </div>
          <h3>Potential Savings</h3>
          <div className="number">~35%</div>
          <p>Gas Reduction</p>
        </div>

        <div className="card blue">
          <div className="icon">
            <Code className="icon-size" />
          </div>
          <h3>Optimization Tips</h3>
          <div className="number">4</div>
          <p>Suggestions</p>
        </div>
      </div>

      <div className="optimization-section">
        <h3>Inefficient Functions</h3>
        {results?.inefficientFunctions?.map((func, index) => (
          <div key={index} className="optimization-card">
            <div className="function-header">
              <Zap className="icon-small purple-text" />
              <h4>{func.name}</h4>
            </div>
            <div className="description">
              <strong>Issue:</strong>
              <p>{func.issue}</p>
            </div>
            <div className="description">
              <strong>Suggestion:</strong>
              <p>{func.suggestion}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="optimization-section">
        <h3>General Optimization Tips</h3>
        <div className="tip">
          <CheckCircle className="icon-small green-text" />
          <div>
            <h4>Use Packed Storage</h4>
            <p>Pack multiple variables into a single storage slot when possible to reduce gas costs.</p>
          </div>
        </div>

        <div className="tip">
          <CheckCircle className="icon-small green-text" />
          <div>
            <h4>Avoid Unnecessary Storage</h4>
            <p>Use memory instead of storage when possible, especially in loops.</p>
          </div>
        </div>

        <div className="tip">
          <CheckCircle className="icon-small green-text" />
          <div>
            <h4>Optimize Loop Operations</h4>
            <p>Cache array length outside of loops and use unchecked blocks for counters in Solidity 0.8+.</p>
          </div>
        </div>

        <div className="tip">
          <CheckCircle className="icon-small green-text" />
          <div>
            <h4>Use Events for Cheap Storage</h4>
            <p>Emit events instead of storing data that is only needed off-chain.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasOptimization;
