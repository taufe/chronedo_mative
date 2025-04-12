// pages/api/fixedPriceApi.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      watch_id,
      chronedo_protection,
      delivery_method,
      order_type,
      watch_name,
      watch_price,
      total_price,
      promo_id,
      final_price,
      token
    } = req.body;
    

    // Use static token for now
    // const token = "222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88";

    const requestData = {
      watch_id: watch_id,
      chronedo_protection: chronedo_protection ?? true,
      delivery_method: delivery_method || "local pickup",
      order_type: order_type || 1,
      watch_name: watch_name || "Default Watch",
      watch_price: watch_price || "0",
      total_price: total_price || "0",
      promo_id: promo_id || null,
      final_price: final_price || "0"
    };

    const response = await axios.post(
      "https://chronedo.webjerky.com/api/buyWatchFixedPrice",
      requestData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Buy Watch API Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.response?.data || error.message,
    });
  }
}











// // pages/api/fixedPriceApi.js
// import axios from "axios";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const {
//       watch_id,
//       chronedo_protection,
//       delivery_method,
//       order_type,
//       watch_name,
//       watch_price,
//       total_price,
//       promo_id,
//       final_price,
//       token
//     } = req.body;

//     if (!token) {
//       return res.status(400).json({ message: "Authorization token is required" });
//     }

//     const requestData = {
//       watch_id: watch_id || 24,
//       chronedo_protection: chronedo_protection ?? true,
//       delivery_method: delivery_method || "local pickup",
//       order_type: order_type || 1,
//       watch_name: watch_name || "Default Watch",
//       watch_price: watch_price || "0",
//       total_price: total_price || "0",
//       promo_id: promo_id || null,
//       final_price: final_price || "0"
//     };

//     const response = await axios.post(
//       "https://chronedo.webjerky.com/api/buyWatchFixedPrice",
//       requestData,
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         }
//       }
//     );

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Buy Watch API Error:", error.response?.data || error.message);
//     res.status(500).json({
//       message: "Internal Server Error",
//       error: error.response?.data || error.message,
//     });
//   }
// }














// // import axios from "axios";

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") {
// //     return res.status(405).json({ error: "Method not allowed" });
// //   }

// //   try {
// //     // Extract parameters from the request body
// //     const {
// //       watch_id,
// //       chronedo_protection,
// //       delivery_method,
// //       order_type,
// //       watch_name,
// //       watch_price,
// //       total_price,
// //       promo_id,
// //       final_price,
// //       token
// //     } = req.body;

// //     // Define static fallback values for missing parameters
// //     const requestData = {
// //       watch_id: watch_id || 24, 
// //       chronedo_protection: chronedo_protection ?? true, 
// //       delivery_method: delivery_method || "local pickup",
// //       order_type: order_type || 1, 
// //       watch_name: watch_name || "Rolex Daytona",
// //       watch_price: watch_price || 10000,
// //       total_price: total_price || 9500,
// //       promo_id: promo_id ?? null,
// //       final_price: final_price || 9950,
// //     };

// //     // const token = "222|wq0yIWuRTDsOMPsWwfQLH4WEhVHDCO1RLLzLj0lXb7c13b88";

// //     // Make the API call to buyWatchFixedPrice
// //     const response = await axios.post(
// //       "https://chronedo.webjerky.com/api/buyWatchFixedPrice",
// //       requestData,
// //       {
// //         headers: {
// //           Accept: "application/json",
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     // Return the API response
// //     res.status(200).json(response.data);
// //   } catch (error) {
// //     console.error("Buy Watch API Error:", error.response?.data || error.message);
// //     res.status(500).json({
// //       message: "Internal Server Error",
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // }


// const handleConfirmPurchase = async () => {
//   try {
//     const response = await axios.post("/api/fixedPriceApi", {
//       watch_id: id,
//       chronedo_protection: true, // static or toggleable
//       delivery_method: delivery_method,
//       order_type: 1,
//       watch_name: watch_name,
//       watch_price: watch_price,
//       total_price: total_price,
//       promo_id: promo_id || null,
//       final_price: final_price,
//       token
//     });

//     if (response.data.success === true) {
//       console.log(response.data.message);
//       setShowSuccessPopup(true);
//     } else {
//       setError(response.data.message || "Verification failed. Please try again.");
//     }
//   } catch (err) {
//     console.error("API error:", err);

//     if (err.response?.status === 401) {
//       setError("Invalid email or password.");
//     } else {
//       setError(err.response?.data?.message || "An error occurred. Please try again later.");
//     }
//   } finally {
//     setLoading(false);
//   }
// };

