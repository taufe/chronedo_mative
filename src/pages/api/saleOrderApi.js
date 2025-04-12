import axios from "axios";

export default async function handler(req, res) {
  const { id, status, token, ...ratingData } = req.body;
  
  try {
    const { data } = await axios.post(
      "https://chronedo.webjerky.com/api/orderStatus",
      { id, status, ...ratingData },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
}







// // pages/api/updateOrderStatusApi.js
// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const {
//       id,
//       order_status,
//       status,
//       token
//     } = req.body;

//     if (!id || order_status === undefined || !token) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const requestData = {
//       id,
//       order_status,
//       status: status ?? 0
//     };

//     const response = await axios.post(
//       "https://chronedo.webjerky.com/api/orderStatus",
//       requestData,
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     return res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Order Status Update Error:", error.response?.data || error.message);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.response?.data || error.message
//     });
//   }
// }
