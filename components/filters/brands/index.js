import React, { useState } from "react";
import styles from "../filters.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Brands({ brands }) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const path = router.pathname;

  return (
    <div className={styles.filter}>
      <h3 onClick={() => setShow((prev) => !prev)}>
        Brands
        <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes_wrap}>
          {brands.map((brand, index) => (
            <button className={styles.filter__brand}>
              <img src={`../../../images/brands/${brand}.png`} alt={brand} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
