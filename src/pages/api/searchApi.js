import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      brand,
      model,
      price,
      fixedPrice,
      gender,
      searchValue,
      user_id,
      clasp_material,
      bracelet_color,
      bracelet_material,
      crystal,
      bezel_material,
      caseMaterial,
      diameter,
      dial_color,
      power_reserve,
      movement,
      warranty_of_me_until,
      manufacturer_warranty_until,
      condition_name,
      watch_type,
    } = req.body;

    const response = await axios.post(
      "https://chronedo.webjerky.com/api/guestSearch",
      {
        brand,
        model,
        price,
        fixedPrice,
        gender,
        searchValue,
        user_id,
        clasp_material,
        bracelet_color,
        bracelet_material,
        crystal,
        bezel_material,
        caseMaterial,
        diameter,
        dial_color,
        power_reserve,
        movement,
        warranty_of_me_until,
        manufacturer_warranty_until,
        condition_name,
        watch_type,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Search API Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.response?.data || error.message,
    });
  }
}
