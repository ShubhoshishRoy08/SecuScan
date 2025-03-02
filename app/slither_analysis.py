import subprocess
import json

def run_slither_analysis(file_path):
    """Run Slither on the given Solidity file and return vulnerabilities."""
    try:
        # Run Slither with JSON output
        result = subprocess.run(
            ["slither", file_path, "--json", "-"],
            capture_output=True,
            text=True
        )

        # Parse JSON output
        slither_output = json.loads(result.stdout)

        # Extract vulnerability information
        vulnerabilities = []
        for issue in slither_output.get("results", {}).get("detectors", []):
            vulnerabilities.append({
                "type": issue["check"],
                "description": issue["description"]
            })

        return vulnerabilities

    except Exception as e:
        return [{"error": f"Failed to analyze file: {str(e)}"}]
