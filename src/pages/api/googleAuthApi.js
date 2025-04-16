import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { idToken } = req.body;
    
    if (!idToken) {
      return res.status(400).json({ success: false, message: 'ID token is required' });
    }

    // Send the token to your backend API
    const response = await axios.post('https://chronedo.webjerky.com/api/socialregistration', {
      email: idToken.email,
      source: "g", // Google source
    });

    if (response.data.success) {
      // Return the token from your backend
      return res.status(200).json({
        success: true,
        token: response.data.token,
        user: response.data.user
      });
    } else {
      return res.status(400).json({
        success: false,
        message: response.data.message || 'Google authentication failed'
      });
    }
  } catch (error) {
    console.error('Google authentication error:', error);
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'An error occurred during Google authentication'
    });
  }
} 