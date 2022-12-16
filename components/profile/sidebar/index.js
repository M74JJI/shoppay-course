import { sidebarData } from "../../../data/profile";
import Item from "./Item";
import styles from "./styles.module.scss";

export default function Sidebar({ data }) {
  console.log(data);
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <img src={data.image} alt="" />
        <span className={styles.sidebar__name}>{data.name}</span>
        <ul>
          {sidebarData.map((item, i) => (
            <Item
              kye={i}
              item={item}
              visible={data.tab == i.toString()}
              index={i.toString()}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
