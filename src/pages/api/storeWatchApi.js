import axios from 'axios';
import { IncomingForm } from 'formidable';
import FormData from 'form-data';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const form = new IncomingForm();
    const formData = new FormData();

    // Parse incoming form data
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Add fields to formData
    Object.entries(fields).forEach(([key, values]) => {
      values.forEach(value => formData.append(key, value));
    });

    // Add files to formData
    Object.entries(files).forEach(([key, fileArray]) => {
      fileArray.forEach(file => {
        formData.append(key, createReadStream(file.filepath), {
          filename: file.originalFilename,
          contentType: file.mimetype,
        });
      });
    });

    // Forward to backend API
    const response = await axios.post(
      'https://chronedo.webjerky.com/api/watches',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({
      message: error.response?.data?.message || 'Internal server error',
    });
  }
}