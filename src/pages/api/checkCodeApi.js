import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Extract discountCode from the request body
    const { promo,token } = req.body;

    // Ensure discountCode is present
    if (!promo) {
      return res.status(400).json({ error: "Missing required field: promo" });
    }

    // const token = "222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88";

    // Make the API call with discountCode in the request body
    const response = await axios.post(
      "https://chronedo.webjerky.com/api/checkCode",
      { promo },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return the response from the external API
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Discount Code API Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.response?.data || error.message,
    });
  }
}