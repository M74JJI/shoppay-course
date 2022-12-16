import Layout from "../../../components/admin/layout";
import styles from "../../../styles/dashboard.module.scss";
import User from "../../../models/User";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import { getSession } from "next-auth/react";
import { GrView } from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";
import Link from "next/link";
import { TbUsers } from "react-icons/tb";
import { SlHandbag } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { SlEye } from "react-icons/sl";
import { useSession } from "next-auth/react";
import Dropdown from "../../../components/admin/dashboard/Dropdown";
import { IoNotificationsSharp } from "react-icons/io5";
import Notifications from "../../../components/admin/dashboard/notifications";
export default function Dashboard({ users, orders, products }) {
  const { data: session } = useSession();

  return (
    <div>
      <Layout>
        <header className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Search ..." />
            </label>
          </div>
          <div className={styles.header__logo}></div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user.image} />
            <Notifications />
          </div>
        </header>
        <div className={styles.cards}>
          <div className={styles.statusCard}>
            <div className={styles.statusCard__icon}>
              <TbUsers />
            </div>
            <div className={styles.statusCard__info}>
              <h4>+{users.length}</h4>
              <span>Users</span>
            </div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusCard__icon}>
              <SlHandbag />
            </div>
            <div className={styles.statusCard__info}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusCard__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.statusCard__info}>
              <h4>+{products.length}</h4>
              <span>Products</span>
            </div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusCard__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.statusCard__info}>
              <h4>+{orders.reduce((a, val) => a + val.total, 0)}$</h4>
              <h5>
                ( -
                {orders
                  .filter((o) => !o.isPaid)
                  .reduce((a, val) => a + val.total, 0)}
                $ Unpaid yet )
              </h5>
              <span>Total Earnings</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={`${styles.heading}`}>
              <h2>Recent Orders</h2>
              <Link href="">View All</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Total</td>
                  <td>Payment</td>
                  <td>Status</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{order.user.name}</td>
                    <td>{order.total} $</td>
                    <td>
                      {order.isPaid ? (
                        <img src="../../../images/verified.webp" alt="" />
                      ) : (
                        <img src="../../../images/unverified1.png" alt="" />
                      )}
                    </td>
                    <td>
                      <div
                        className={`${styles.status} ${
                          order.status == "Not Processed"
                            ? styles.not_processed
                            : order.status == "Processing"
                            ? styles.processing
                            : order.status == "Dispatched"
                            ? styles.dispatched
                            : order.status == "Cancelled"
                            ? styles.cancelled
                            : order.status == "Completed"
                            ? styles.completed
                            : ""
                        }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td>
                      <SlEye />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Recent Users</h2>
              <Link href="">View All</Link>
            </div>
            <table>
              <tbody>
                {users.map((user) => (
                  <tr className={styles.user}>
                    <td className={styles.user__img}>
                      <img src={user.image} alt="" />
                    </td>
                    <td>
                      <h4>{user.name}</h4>
                      <span>{user.email}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const users = await User.find().lean();
  const products = await Product.find().lean();
  const orders = await Order.find()
    .populate({ path: "user", model: User })
    .lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
