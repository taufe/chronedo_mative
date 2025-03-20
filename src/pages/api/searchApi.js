export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    try {
      const { brand, model, price, fixedPrice, gender, searchValue, user_id } = req.body;
  
      const response = await axios.post(
        "https://chronedo.webjerky.com/api/search",
        {
          brand,
          model,
          price,
          fixedPrice,
          gender,
          searchValue,
          user_id, // Add user_id to filter listings
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Search API Error:", error.response?.data || error.message);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.response?.data || error.message,
      });
    }
  }
  