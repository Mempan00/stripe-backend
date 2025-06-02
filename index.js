
import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
const { amount, success_url, cancel_url } = req.body;

try {
const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
mode: "payment",
line_items: [
{
price_data: {
currency: "sek",
product_data: { name: "Bilbokning" },
unit_amount: amount
},
quantity: 1
}
],
success_url,
cancel_url
});

res.json({ url: session.url });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));