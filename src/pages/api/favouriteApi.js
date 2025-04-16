
import axios from 'axios';
import { useData } from '../../context/contextApi';

const ADD_API_URL = 'https://chronedo.webjerky.com/api/favorites';
const REMOVE_API_URL = 'https://chronedo.webjerky.com/api/removeFavorites';
// const token = '258|0WLP2jFTbmXN5YuRziGriKYcgP2AnW4T8gW0fPuUe7ea0c0a';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { id, action,token } = req.body;
            if (!id) return res.status(400).json({ success: false, message: 'ID is required' });

            const apiUrl = action === 'remove' ? REMOVE_API_URL : ADD_API_URL;

            const response = await axios.post(
                apiUrl,
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return res.status(200).json(response.data);
        } else {
            return res.status(405).json({ success: false, message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Internal Server Error',
        });
    }
}
