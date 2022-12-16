import nc from "next-connect";
import User from "../../../models/User";
import Coupon from "../../../models/Coupon";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { coupon, startDate, endDate, discount } = req.body;
    const test = await Coupon.findOne({ coupon });
    if (test) {
      return res.status(400).json({
        message: "This Coupon name already exists, try with a different name.",
      });
    }
    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();

    db.disconnectDb();
    return res.json({
      message: "Coupon created successfully !",
      coupons: await Coupon.find({}),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
