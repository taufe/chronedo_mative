import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Ensure the email, password, and phone_no are passed from the frontend
    const { email, password, phone_no } = req.body;

    // Validate required fields
    if (!email || !password || !phone_no) {
      return res.status(400).json({ error: "Email, password, and phone number are required." });
    }

    // Add latitude and longitude (using default values or real values from geolocation)
    const latitude = 37.7749; // Example latitude (replace with real value)
    const longitude = -122.4194; // Example longitude (replace with real value)

    // Log the data to check what is being sent
    console.log("Sending data to external API:", { email, password, phone_no, latitude, longitude });

    // Send the data to the external API for registration
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

    // Log the external API response
    console.log("External API response:", response.data);

    // Forward the response to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    
    // Log detailed error message
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
