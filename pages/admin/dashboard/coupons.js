import Layout from "../../../components/admin/layout";
import db from "../../../utils/db";
import Coupon from "../../../models/Coupon";
import { useState } from "react";
import Create from "../../../components/admin/coupons/Create";
import List from "../../../components/admin/coupons/List";
export default function Coupons({ coupons }) {
  const [data, setData] = useState(coupons);
  return (
    <Layout>
      <div>
        <Create setCoupons={setData} />
        <List coupons={data} setCoupons={setData} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}
