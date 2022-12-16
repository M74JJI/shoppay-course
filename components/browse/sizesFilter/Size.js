import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";
export default function Size({ size }) {
  const [show, setShow] = useState(false);

  return (
    <label htmlFor={size} className={styles.filter__sizes_size}>
      <input type="checkbox" name="size" id={size} />
      <label htmlFor={size}>{size}</label>
    </label>
  );
}
