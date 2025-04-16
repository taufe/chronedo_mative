import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: "Access token is required." });
    }

    // Send the access token to your backend for verification and user creation/login
    const response = await axios.post(
      "https://chronedo.webjerky.com/api/facebook-auth",
      { accessToken },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Facebook Auth API Error:", error.response?.data || error.message);
    
    if (error.response) {
      console.error("API Error Response Data:", error.response.data);
      console.error("API Error Response Status:", error.response.status);
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.response?.data || error.message,
    });
  }
} 