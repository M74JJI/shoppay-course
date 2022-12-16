import axios from "axios";
import { Form, Formik } from "formik";
import { useRef } from "react";
import { useState } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import SingularSelect from "../../selects/SingularSelect";
import styles from "./styles.module.scss";
export default function ListItem({
  categories,
  subCategory,
  setSubCategories,
}) {
  console.log("sub", subCategory);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const input = useRef(null);
  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete("/api/admin/subCategory", {
        data: { id },
      });
      setSubCategories(data.subCategories);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put("/api/admin/subCategory", {
        id,
        name: name || subCategory.name,
        parent: parent || subCategory.parent._id,
      });
      setSubCategories(data.subCategories);
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
        value={name ? name : subCategory.name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />
      {open && (
        <div className={styles.list__item_expand}>
          <select
            name="parent"
            value={parent || subCategory.parent._id}
            onChange={(e) => setParent(e.target.value)}
            disabled={!open}
            className={styles.select}
          >
            {categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            className={styles.btn}
            onClick={() => handleUpdate(subCategory._id)}
          >
            Save
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setOpen(false);
              setName("");
              setParent("");
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
        <AiFillDelete onClick={() => handleRemove(subCategory._id)} />
      </div>
    </li>
  );
}
