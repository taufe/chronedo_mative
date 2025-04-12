import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { accountType, country, chamberNumber, token } = req.body;

      if (!accountType || !country?.code) {
        return res.status(400).json({ 
          error: "Missing required fields: accountType and/or country code" 
        });
      }

      const data = {
        type: accountType,
        country: country.code,
        ...(accountType === 'business' && chamberNumber && { coc_nr: chamberNumber }),
      };

      const response = await axios.post(
        "https://chronedo.webjerky.com/api/createMerchant",
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      return res.status(200).json(response.data);
    } 
    else if (req.method === "GET") {
      const token = req.headers.authorization?.split(' ')[1] || req.query.token;

      if (!token) {
        return res.status(401).json({ error: "Authorization token required" });
      }

      const response = await axios.get(
        "https://chronedo.webjerky.com/api/createMerchant",
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      return res.status(200).json(response.data);
    } 
    else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    
    // Extract a clean error message
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        "An unexpected error occurred";
    
    return res.status(error.response?.status || 500).json({
      error: errorMessage
    });
  }
}