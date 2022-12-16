import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import { useRouter } from "next/router";

export default function BrandsFilter({ brands, brandHandler, replaceQuery }) {
  const router = useRouter();
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Brands <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {brands.map((brand, i) => {
            const check = replaceQuery("brand", brand);
            return (
              <button
                className={`${styles.filter__brand} ${
                  check.active ? styles.activeFilter : ""
                }`}
                onClick={() => brandHandler(check.result)}
              >
                <img src={`../../../images/brands/${brand}.png`} alt="" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
