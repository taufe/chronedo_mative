import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password, phone_no } = req.body;

    if (!email || !password || !phone_no) {
      return res.status(400).json({ error: "Email, password, and phone number are required." });
    }

    const latitude = 37.7749; 
    const longitude = -122.4194; 

    console.log("Sending data to external API:", { email, password, phone_no, latitude, longitude });

    const response = await axios.post(
      "https://chronedo.webjerky.com/api/register",
      { email, password, phone_no, latitude, longitude },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("External API response:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    
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
