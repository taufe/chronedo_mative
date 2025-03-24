// import axios from "axios";

// const ReferenceAPIKey = "u2t6bd0cKe4cdGWi4duH9pUnnGnc6XuJc7AdwMhe";

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     // Extract the reference number from the query parameters
//     const { id } = req.query;

//     if (!id) {
//       return res.status(400).json({ error: "Reference number (id) is required." });
//     }

//     // Fetch data from the Watchbase API
//     const response = await axios.get(
//       `https://api.watchbase.com/v1/watch?key=${ReferenceAPIKey}&format=json&id=${id}`
//     );

//     // Return the data to the frontend
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("API Error:", error.response?.data || error.message);
//     res.status(500).json({
//       message: "Internal Server Error",
//       error: error.response?.data || error.message,
//     });
//   }
// }