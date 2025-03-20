import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Extract parameters from the request body
    const { watch_id, discount, sales_commission } = req.body;

    // Ensure required fields are present
    if (!watch_id || discount === undefined || sales_commission === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const token = "222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88";

    // Make the API call
    const response = await axios.post(
      "https://chronedo.webjerky.com/api/createPromo",
      { watch_id, discount, sales_commission },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return API response
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Buy Watch API Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.response?.data || error.message,
    });
  }
}
