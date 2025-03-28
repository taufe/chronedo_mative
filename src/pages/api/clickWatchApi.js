import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { id, token } = req.body;

        if (!id) {
            return res.status(400).json({ error: "Missing required field: id" });
        }

        const response = await axios.post(
            `https://chronedo.webjerky.com/api/watches/${id}/click`,
            {},
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Watch Click API Error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.response?.data || error.message,
        });
    }
}