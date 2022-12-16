import styles from "../filters.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import Card from "./card";
export default function CategoryFilter({ categories, subCategories }) {
  const [showFilter, setShowFilter] = useState(true);

  return (
    <div className={styles.filter}>
      <h3 onClick={() => setShowFilter((prev) => !prev)}>
        Category
        <span>{showFilter ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {showFilter && (
        <>
          {categories.map((category, index) => (
            <Card category={category} subCategories={subCategories} />
          ))}
        </>
      )}
    </div>
  );
}
/*
   <section>
      
       
      </section>
*/
