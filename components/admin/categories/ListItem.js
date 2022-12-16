import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
export default function ListItem({ category, setCategories }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const input = useRef(null);
  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete("/api/admin/category", {
        data: { id },
      });
      setCategories(data.categories);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put("/api/admin/category", {
        id,
        name,
      });
      setCategories(data.categories);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <li className={styles.list__item}>
      <input
        className={open ? styles.open : ""}
        type="text"
        value={name ? name : category.name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />
      {open && (
        <div className={styles.list__item_expand}>
          <button
            className={styles.btn}
            onClick={() => handleUpdate(category._id)}
          >
            Save
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setOpen(false);
              setName("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              input.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => handleRemove(category._id)} />
      </div>
    </li>
  );
}
