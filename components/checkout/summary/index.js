import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ShippingInput from "../../inputs/shippingInput";
import { applyCoupon } from "../../../requests/user";
import axios from "axios";
import Router from "next/router";
export default function Summary({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress,
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [order_error, setOrder_Error] = useState("");
  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Pleace enter a coupon first !"),
  });
  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon);
    if (res.message) {
      setError(res.message);
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      setError("");
    }
  };
  const placeOrderHandler = async () => {
    try {
      if (paymentMethod == "") {
        setOrder_Error("Please choose a payment method.");
        return;
      } else if (!selectedAddress) {
        setOrder_Error("Please choose a shipping address.");
        return;
      }
      const { data } = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
        totalBeforeDiscount: cart.cartTotal,
        couponApplied: coupon,
      });
      Router.push(`/order/${data.order_id}`);
    } catch (error) {
      setOrder_Error(error.response.data.message);
    }
  };
  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => {
            applyCouponHandler();
          }}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                name="coupon"
                placeholder="*Coupon"
                onChange={(e) => setCoupon(e.target.value)}
              />
              {error && <span className={styles.error}>{error}</span>}
              <button className={styles.apply_btn} type="submit">
                Apply
              </button>
              <div className={styles.infos}>
                <span>
                  Total : <b>{cart.cartTotal}$</b>{" "}
                </span>
                {discount > 0 && (
                  <span className={styles.coupon_span}>
                    Coupon applied : <b>-{discount}%</b>
                  </span>
                )}
                {totalAfterDiscount < cart.cartTotal &&
                  totalAfterDiscount != "" && (
                    <span>
                      New price : <b>{totalAfterDiscount}$</b>
                    </span>
                  )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button className={styles.submit_btn} onClick={() => placeOrderHandler()}>
        Place Order
      </button>
      {order_error && <span className={styles.error}>{order_error}</span>}
    </div>
  );
}
