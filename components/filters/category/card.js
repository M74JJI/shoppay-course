import Link from "next/link";
import React, { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/router";
export default function Card({ category, subCategories }) {
  const router = useRouter();
  const path = router.asPath;
  console.log("router", router);
  const [showsubFilter, setShowsubFilter] = useState(false);
  return (
    <>
      <section>
        <li>
          <input
            type="radio"
            name="filter"
            id={category._id}
            checked={router.query.ctg == category._id}
          />
          <label
            htmlFor={category._id}
            onClick={() => {
              router.push({
                pathname: path,
                query: {
                  ctg: category._id,
                },
              });
            }}
          >
            <a>{category.name}</a>
          </label>
          <span>{showsubFilter ? <FaMinus /> : <BsPlusLg />}</span>
        </li>
        <ul>
          {subCategories.length &&
            subCategories[0].parent._id == category._id &&
            subCategories.map((s) => (
              <li
                onClick={() => {
                  router.push({
                    pathname: path,
                    query: {
                      s: s._id,
                    },
                  });
                }}
              >
                <input type="radio" name="filter" />
                <Link href="">
                  <a>{s.name}</a>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
