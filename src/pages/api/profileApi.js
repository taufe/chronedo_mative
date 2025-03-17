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
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Parse the multipart form data manually
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
            // Handle file upload
            const fileData = part.split('\r\n\r\n')[1].trim();
            files[name] = {
              filename,
              data: Buffer.from(fileData),
            };
          } else {
            // Handle regular field
            const value = part.split('\r\n\r\n')[1].trim();
            fields[name] = value;
          }
        }
      }
    });

    // Extract fields
    const {
      email,
      first_name,
      last_name,
      account_type,
      street,
      date_of_birth,
      selectedIdType,
      language,
      zip_code,
      city,
      country,
      delivery_country,
      currency,
    } = fields;

    // Prepare form data for the backend API
    const formData = new FormData();
    formData.append('email', email);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('account_type', account_type);
    formData.append('address', street);
    formData.append('dob', date_of_birth);
    formData.append('type', selectedIdType === 'id' ? 'ID' : 'Passport');
    formData.append('language', language);
    formData.append('zip_code', zip_code);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('shipping_country', delivery_country);
    formData.append('currency', currency);

    // Append files to form data
    for (const [key, file] of Object.entries(files)) {
      formData.append(key, file.data, file.filename);
    }

    // Send data to the backend API
    const backendResponse = await fetch('https://chronedo.webjerky.com/api/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`,
      },
      body: formData,
    });

    if (!backendResponse.ok) {
      throw new Error('Failed to submit form to the backend');
    }

    const backendData = await backendResponse.json();
    return res.status(200).json(backendData);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to process the request' });
  }
}