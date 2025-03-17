import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Ensure the phone number and country code are passed from the frontend
    const { phone_no, country_code } = req.body;

    // Validate that phone_no and country_code are provided
    if (!phone_no || !country_code) {
      return res.status(400).json({ error: 'Phone number and country code are required.' });
    }

    // Combine country code and phone number
    const fullPhoneNumber = country_code + phone_no; // Ensure they are concatenated correctly

    const response = await axios.post(
      'https://chronedo.webjerky.com/api/verifyPhone',
      { phone_no: fullPhoneNumber },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the response from the external API
    res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.response?.data || error.message,
    });
  }
}
