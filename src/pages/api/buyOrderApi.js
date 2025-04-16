import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { id, status, token } = req.body;

            const requestData = {
                id,
                status: status
            };

            const externalApiResponse = await axios.post(
                'https://chronedo.webjerky.com/api/orderStatus',
                requestData,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Use token here
                    },
                }
            );

            res.status(externalApiResponse.status).json(externalApiResponse.data);
        } catch (error) {
            console.error('Error calling external API:', error);
            res.status(500).json({ message: 'Failed to call external API', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}