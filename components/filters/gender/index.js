import styless from "../filters.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import Size from "./Size";
export default function GenderFilter() {
  const [show, setShow] = useState(true);
  const genders = ["Men", "women", "Unisex"];
  return (
    <div className={styless.filter}>
      <h3 onClick={() => setShow((prev) => !prev)}>
        Gender
        <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div>
          {genders.map((gender, index) => (
            <div className={styless.filter__sizes_wrap_size}>
              <input type="checkbox" name="style" id={gender} />
              <label htmlFor={gender}>{gender}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
