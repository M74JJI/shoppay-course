import { FaStaylinked } from "react-icons/fa";
import styles from "./styles.module.scss";

export default function Products({ cart }) {
  return (
    <div className={styles.products}>
      <div className={styles.products__header}>
        <h1>Cart</h1>
        <span>
          {cart.products.length == 1
            ? "1 item"
            : `${cart.products.length} items`}
        </span>
      </div>
      <div className={styles.products__wrap}>
        {cart.products.map((product) => (
          <div className={styles.product}>
            <div className={styles.product__img}>
              <img src={product.image} alt="" />
              <div className={styles.product__infos}>
                <img src={product.color.image} alt="" />
                <span>{product.size}</span>
                <span>x{product.qty}</span>
              </div>
            </div>
            <div className={styles.product__name}>
              {product.name.length > 18
                ? `${product.name.substring(0, 18)}...`
                : product.name}
            </div>
            <div className={styles.product__price}>
              {(product.price * product.qty).toFixed(2)}$
            </div>
          </div>
        ))}
      </div>
      <div className={styles.products__total}>
        Subtotal : <b>{cart.cartTotal}$</b>
      </div>
    </div>
  );
}
