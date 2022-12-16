import React, { useState } from "react";
import styles from "../filters.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
export default function Style({ data }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3 onClick={() => setShow((prev) => !prev)}>
        Style
        <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div>
          {data.map((style, index) => (
            <div className={styles.filter__sizes_wrap_size}>
              <input type="checkbox" name="style" id={style} />
              <label htmlFor={style}>{style}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
