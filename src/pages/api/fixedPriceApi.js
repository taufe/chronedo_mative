import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Extract parameters from the request body
    const {
      watch_id,
      chronedo_protection,
      delivery_method,
      order_type,
      watch_name,
      watch_price,
      total_price,
      promo_id,
      final_price,
      token
    } = req.body;

    // Define static fallback values for missing parameters
    const requestData = {
      watch_id: watch_id || 24, 
      chronedo_protection: chronedo_protection ?? true, 
      delivery_method: delivery_method || "local pickup",
      order_type: order_type || 1, 
      watch_name: watch_name || "Rolex Daytona",
      watch_price: watch_price || 10000,
      total_price: total_price || 9500,
      promo_id: promo_id ?? null,
      final_price: final_price || 9950,
    };

    // const token = "222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88";

    // Make the API call to buyWatchFixedPrice
    const response = await axios.post(
      "https://chronedo.webjerky.com/api/buyWatchFixedPrice",
      requestData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return the API response
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Buy Watch API Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.response?.data || error.message,
    });
  }
}
