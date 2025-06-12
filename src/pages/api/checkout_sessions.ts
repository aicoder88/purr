import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cart } = req.body;

  const line_items = cart.map((item: any) => ({
    price_data: {
      currency: "CAD",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/cart`,
  });

  res.status(200).json({ url: session.url });
}
