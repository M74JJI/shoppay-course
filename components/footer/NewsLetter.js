import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const subscribe = async () => {
    setSuccess("");
    setError("");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/newsletter", { email });
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setSuccess("");
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className={styles.footer__newsletter}>
      <h3>SIGN UP FOR OUR NEWSLETTER</h3>
      <div className={styles.footer__flex}>
        <input
          type="text"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={styles.btn_primary}
          disbaled={loading === true}
          style={{ cursor: `${loading ? "not-allowed" : ""}` }}
          onClick={() => subscribe()}
        >
          SUBSCRIBE
        </button>
      </div>
      {loading && <div className="">loading...</div>}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <p>
        By clicking the SUBSCRIBE button, you are agreeing to{" "}
        <Link href="">our Privacy & Cookie Policy</Link>
      </p>
    </div>
  );
}
