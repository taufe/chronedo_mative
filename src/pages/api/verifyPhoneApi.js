// pages/api/storeWatchApi.js
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable default bodyParser to handle multipart form data
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token missing' });
    }

    // Parse the incoming form data
    const form = new formidable.IncomingForm();
    const formData = await new Promise((resolve, reject) => {
      const data = {};
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        
        // Combine fields and files
        Object.assign(data, fields);
        
        // Convert files to the format axios expects
        for (const [key, file] of Object.entries(files)) {
          data[key] = fs.createReadStream(file.filepath);
        }
        
        resolve(data);
      });
    });

    // Log the received data for debugging
    console.log('Received form data:', Object.keys(formData));

    // Forward the request to your backend
    const response = await axios.post(
      'https://chronedo.webjerky.com/api/watches',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    // Return the response from the external API
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in storeWatchApi:', error);
    
    // More detailed error response
    const errorResponse = {
      message: 'Internal server error',
      error: error.message,
      ...(error.response?.data && { backendError: error.response.data }),
      ...(error.response?.status && { statusCode: error.response.status }),
    };

    return res.status(error.response?.status || 500).json(errorResponse);
  }
}