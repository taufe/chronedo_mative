// pages/api/stripePaymentApi.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { packageDetails } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: packageDetails.name || "Subscription Plan",
            },
            unit_amount: Number(packageDetails.price) * 100, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        plan_id: packageDetails.plan_id.toString(),
        price: packageDetails.price.toString(),
      },
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe session error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
