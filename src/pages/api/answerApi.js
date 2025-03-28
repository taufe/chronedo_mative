import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { questionId, answer, token } = req.body;

        if (!questionId || !answer) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const response = await axios.post(
            `https://chronedo.webjerky.com/api/questions/${questionId}/answer`,
            { answer },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Answer API Error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.response?.data || error.message,
        });
    }
}