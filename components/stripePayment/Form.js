import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import styles from "./styles.module.scss";
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      //iconColor: "#000",
      //color: "#000",
      //fontSize: "16px",
      fontSmoothing: "antialiased",
      //":-webkit-autofill": { color: "#000" },
      //"::placeholder": { color: "#000" },
    },
    invalid: {
      iconColor: "#fd010169",
      color: "#fd010169",
    },
  },
};
export default function Form({ total, order_id }) {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post(`/api/order/${order_id}/payWithStripe`, {
          amount: total,
          id,
        });
        console.log(res);
        if (res.data.success) {
          window.location.reload(false);
        }
      } catch (error) {
        setError(error);
      }
    } else {
      setError(error.message);
    }
  };
  return (
    <div className={styles.stripe}>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_OPTIONS} />
        <button type="submit">PAY</button>
        {error && <span className={styles}>{error}</span>}
      </form>
    </div>
  );
}
