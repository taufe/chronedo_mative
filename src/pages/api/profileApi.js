import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the authorization token from the request headers
    const token = req.headers.authorization;
    console.log('Authorization token:', token);
    
    // Parse the multipart form data
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    
    // Get the boundary from the content-type header
    const boundary = req.headers['content-type'].split('boundary=')[1];
    console.log('Boundary:', boundary);
    
    // Split the buffer by the boundary
    const parts = buffer.toString().split(`--${boundary}`);
    console.log('Number of parts:', parts.length);
    
    // Create a new FormData object to forward to the backend
    const formData = new FormData();
    
    // Process each part
    for (const part of parts) {
      if (part.includes('Content-Disposition: form-data')) {
        // Extract field name and filename if present
        const nameMatch = part.match(/name="([^"]+)"/);
        const filenameMatch = part.match(/filename="([^"]+)"/);
        
        if (nameMatch) {
          const name = nameMatch[1];
          const filename = filenameMatch ? filenameMatch[1] : null;
          
          // Get the content of the field
          const contentStart = part.indexOf('\r\n\r\n') + 4;
          const content = part.substring(contentStart, part.length - 2); // Remove trailing \r\n
          
          if (filename) {
            // This is a file upload
            console.log(`Processing file upload: ${name}, filename: ${filename}`);
            const fileBuffer = Buffer.from(content);
            
            // Create a Blob from the buffer
            const blob = new Blob([fileBuffer], { type: 'application/octet-stream' });
            
            // Create a File object from the Blob
            const file = new File([blob], filename, { type: 'application/octet-stream' });
            
            // Append the file to the FormData
            formData.append(name, file);
            console.log(`File uploaded: ${name}, filename: ${filename}, size: ${fileBuffer.length} bytes`);
          } else {
            // This is a regular field
            formData.append(name, content);
            console.log(`Field added: ${name}, value: ${content}`);
          }
        }
      }
    }
    
    // Log the form data keys for debugging
    console.log('Form data keys:', Array.from(formData.keys()));
    
    // Forward the request to the backend API
    console.log('Sending request to backend API...');
    const response = await fetch('https://chronedo.webjerky.com/api/profile', {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
      body: formData,
    });
    
    console.log('Backend API response status:', response.status);
    const data = await response.json();
    console.log('Backend API response data:', data);
    
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}