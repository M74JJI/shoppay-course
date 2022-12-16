import styles from "./styles.module.scss";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href="/">
            <img src="../../../logo.png" alt="" />
          </Link>
        </div>
        <div className={styles.header__right}>
          <Link href="/browse">
            <a>
              Continue Shopping
              <MdPlayArrow />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
