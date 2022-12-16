import nc from "next-connect";
import auth from "../../../../middleware/auth";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    console.log(req.body);
    const { amount, id } = req.body;
    const order_id = req.query.id;
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "USD",
      description: "M74JJI Store",
      payment_method: id,
      confirm: true,
    });
    const order = await Order.findById(order_id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: payment.id,
        status: payment.status,
        email_address: payment.email_address,
      };
      await order.save();
      res.json({
        success: true,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
    db.disconnectDb();
  } catch (error) {
    console.log(error);
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default handler;
