import React, { useRef } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import { VscHome } from "react-icons/vsc";
import { FaRegUserCircle, FaThList } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { MdSpaceDashboard, MdOutlineCategory } from "react-icons/md";
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { BsPatchPlus } from "react-icons/bs";
import { RiCoupon3Fill, RiSettingsLine } from "react-icons/ri";
import Link from "next/link";
const index = ({ userImage }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={styles.dropdown}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
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
        <div className={styles.dropdown__content__items}>
          <div className={styles.dropdown__content__items_item}>
            <Link href="/">
              <VscHome />
            </Link>
          </div>
          <div className={styles.dropdown__content__items_item}>
            <Link href="/">
              <FaRegUserCircle />
            </Link>
          </div>
          <div className={styles.dropdown__content__items_item}>
            <IoNotificationsSharp />
          </div>
          <div className={styles.dropdown__content__items_item}>
            <Link href="/">
              <RiSettingsLine />
            </Link>
          </div>
        </div>
        <div className={styles.dropdown__logout}>
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default index;
