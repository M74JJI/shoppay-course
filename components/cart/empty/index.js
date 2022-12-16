import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
export default function Empty() {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <img src="../../../images/empty.png" alt="" />
      <h1>Cart is empty</h1>
      {!session && (
        <button onClick={() => signIn()} className={styles.empty__btn}>
          SIGN IN / REGISTER
        </button>
      )}
      <Link href="/browse">
        <a>
          <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
            SHOP NOW
          </button>
        </a>
      </Link>
    </div>
  );
}
