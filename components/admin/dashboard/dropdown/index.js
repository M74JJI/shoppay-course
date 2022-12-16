import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
//-----------------------
import {
  MdArrowForwardIos,
  MdOutlineCategory,
  MdSpaceDashboard,
} from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { FaRegUserCircle, FaThList } from "react-icons/fa";
import { BsPatchPlus } from "react-icons/bs";
import {
  RiCoupon3Fill,
  RiLogoutCircleFill,
  RiSettingsLine,
} from "react-icons/ri";
import { VscHome } from "react-icons/vsc";
import { signOut } from "next-auth/react";
//-----------------------
export default function Dropdown({ userImage }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className={styles.dropdown}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={styles.dropdown__toggle}>
        <img src={userImage} alt="" />
      </div>
      <div
        className={`${styles.dropdown__content} ${show ? styles.active : ""}`}
      >
        <div className={styles.dropdown__content_icons}>
          <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard">
              <MdSpaceDashboard />
            </Link>
          </div>
          <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/sales">
              <FcSalesPerformance />
            </Link>
          </div>
          <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/orders">
              <IoListCircleSharp />
            </Link>
          </div>
          <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/users">
              <ImUsers />
            </Link>
          </div>
          <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/messages">
              <AiFillMessage />
            </Link>
          </div>
          <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/product/all">
              <FaThList />
            </Link>
          </div>
          <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/product/create">
              <BsPatchPlus />
            </Link>
          </div>
          <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/categories">
              <MdOutlineCategory />
            </Link>
          </div>
          <div
            className={styles.dropdown__content_icons_icon}
            style={{ transform: "rotate(180deg)" }}
          >
            <Link href="/admin/dashboard/subCategories">
              <MdOutlineCategory />
            </Link>
          </div>
          <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard/coupons">
              <RiCoupon3Fill />
            </Link>
          </div>
        </div>
        <div className={styles.dropdown__content_items}>
          <div className={styles.dropdown__content_items_item}>
            <Link href="/">
              <VscHome />
            </Link>
          </div>
          <div className={styles.dropdown__content_items_item}>
            <Link href="/">
              <FaRegUserCircle />
            </Link>
          </div>
          <div className={styles.dropdown__content_items_item}>
            <Link href="/">
              <IoNotificationsSharp />
            </Link>
          </div>
          <div className={styles.dropdown__content_items_item}>
            <Link href="/">
              <RiSettingsLine />
            </Link>
          </div>
        </div>
        <div className={styles.dropdown__logout}>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      </div>
    </div>
  );
}
