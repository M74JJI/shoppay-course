import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";
import Card from "./Card";

export default function CategoryFilter({
  categories,
  subCategories,
  categoryHandler,
  replaceQuery,
}) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Category <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show &&
        categories.map((category, i) => (
          <Card
            key={i}
            category={category}
            subCategories={subCategories}
            categoryHandler={categoryHandler}
            replaceQuery={replaceQuery}
          />
        ))}
    </div>
  );
}
