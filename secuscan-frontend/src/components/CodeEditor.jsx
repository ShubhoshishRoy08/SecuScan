import { useState } from "react";
import "./CodeEditor.css";

export default function CodeEditor({ setCode }) {
  const [solidityCode, setSolidityCode] = useState("");

  const handleChange = (event) => {
    setSolidityCode(event.target.value);
    setCode(event.target.value);
  };

  return (
    <div className="code-editor-container">
      <h2 className="editor-title">Write Solidity Code</h2>
      <textarea
        className="code-textarea"
        placeholder="Write your Solidity contract here..."
        value={solidityCode}
        onChange={handleChange}
      />
    </div>
  );
}