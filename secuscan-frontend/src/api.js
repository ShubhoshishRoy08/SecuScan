const API_URL = "http://127.0.0.1:5000";

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData
    });

    return response.json();
};

export const fetchVulnerabilities = async () => {
    const response = await fetch(`${API_URL}/vulnerabilities`);
    return response.json();
};
