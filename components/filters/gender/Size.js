import styles from "../filters.module.scss";
export default function Size({ size }) {
  return (
    <div className={styles.filter__sizes_wrap_size}>
      <input type="checkbox" name="size" id={size.size} />
      <label htmlFor={size.size}>{size.size}</label>
    </div>
  );
}
