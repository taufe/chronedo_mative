import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Ensure the email is passed from the frontend
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const response = await axios.post(
      "https://chronedo.webjerky.com/api/verifyEmail",
      { email }, // Send email as part of the request body
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
