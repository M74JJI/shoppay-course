import { useState } from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { sizesList } from "../../../../data/sizes";
import styles from "./styles.module.scss";

export default function Details({ details, product, setProduct }) {
  const handleDetails = (i, e) => {
    const values = [...details];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, details: values });
  };
  const handleRemove = (i) => {
    if (details.length > 0) {
      const values = [...details];
      values.splice(i, 1);
      setProduct({ ...product, details: values });
    }
  };
  console.log("product details", product.details);
  return (
    <div>
      <div className={styles.header}>Details</div>
      {details.length == 0 && (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              details: [
                ...details,
                {
                  name: "",
                  value: "",
                },
              ],
            });
          }}
        />
      )}
      {details
        ? details.map((detail, i) => (
            <div className={styles.clicktoadd} key={i}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={detail.name}
                onChange={(e) => handleDetails(i, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={detail.value}
                onChange={(e) => handleDetails(i, e)}
              />

              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProduct({
                      ...product,
                      details: [
                        ...details,
                        {
                          name: "",
                          value: "",
                        },
                      ],
                    });
                  }}
                />
              </>
            </div>
          ))
        : ""}
    </div>
  );
}
