import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

export default function GenderFilter({ genderHandler, replaceQuery }) {
  const genders = ["Men", "Women", "Unisex"];
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Gender <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {genders.map((gender, i) => {
            const check = replaceQuery("gender", gender);
            return (
              <label
                htmlFor={gender}
                className={styles.filter__sizes_size}
                onClick={() => genderHandler(check.result)}
              >
                <input
                  type="checkbox"
                  name="gender"
                  id={gender}
                  checked={check.active}
                />
                <label htmlFor={gender}>{gender}</label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
