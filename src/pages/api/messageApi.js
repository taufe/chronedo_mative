import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { to_id, message } = req.body;

        const token = "222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88"; // Replace with your token

        const response = await axios.post(
            "https://chronedo.webjerky.com/api/messages",
            { to_id, message },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.response?.data || error.message,
        });
    }
}