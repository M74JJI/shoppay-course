import { useRouter } from "next/router";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

export default function PatternsFilter({
  patterns,
  patternHandler,
  replaceQuery,
}) {
  const router = useRouter();
  const existedPattern = router.query.pattern || "";
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Pattern <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {patterns.map((pattern, i) => {
            const check = replaceQuery("pattern", pattern);
            return (
              <label
                htmlFor={pattern}
                className={styles.filter__sizes_size}
                onClick={() => patternHandler(check.result)}
              >
                <input
                  type="checkbox"
                  name="pattern"
                  id={pattern}
                  checked={check.active}
                />
                <label htmlFor={pattern}>
                  {pattern.length > 12
                    ? `${pattern.substring(0, 12)}...`
                    : pattern}
                </label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
