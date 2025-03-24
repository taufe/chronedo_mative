import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for handling multipart form data
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Manual multipart parsing (using boundary)
    const boundary = req.headers['content-type'].split('boundary=')[1];
    const parts = buffer.toString().split(`--${boundary}`);

    const fields = {};
    const files = {};

    parts.forEach((part) => {
      if (part.includes('Content-Disposition: form-data')) {
        const match = part.match(/name="([^"]+)"\s*(?:; filename="([^"]+)")?/);
        if (match) {
          const name = match[1];
          const filename = match[2];

          if (filename) {
            const fileData = part.split('\r\n\r\n')[1].trim();
            files[name] = {
              filename,
              data: Buffer.from(fileData),
            };
          } else {
            const value = part.split('\r\n\r\n')[1].trim();
            fields[name] = value;
          }
        }
      }
    });

    // Prepare formData for backend
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

    // Append images/files (cover, side1, side2, etc.)
    for (const [key, file] of Object.entries(files)) {
      formData.append(key, file.data, file.filename);
    }

    // API call to the watch backend
    const backendResponse = await fetch('https://chronedo.webjerky.com/api/watches', {
      method: 'POST',
      headers: {
        Authorization: `Bearer 222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88`,
        ...formData.getHeaders(), // Include headers for multipart form data
      },
      body: formData,
    });

    if (!backendResponse.ok) {
      throw new Error('Failed to submit watch data to the backend');
    }

    const backendData = await backendResponse.json();
    return res.status(200).json(backendData);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to process the request' });
  }
}