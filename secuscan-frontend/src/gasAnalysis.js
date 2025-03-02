const API_URL = "http://127.0.0.1:5000"; // Flask backend URL

export const analyzeGasUsage = async (contractData) => {
    try {
        const response = await fetch(`${API_URL}/gas-analysis`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contractData }), // Send contract data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error analyzing gas usage:", error);
        return { error: "Failed to analyze gas usage" };
    }
};
